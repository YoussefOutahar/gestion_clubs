import jwt from 'jsonwebtoken';
import Mock from '../mock';

import { getProfileById } from '../../app/DataBase/UsersClient';
import { signIn , signUp} from '../../app/DataBase/AuthClient';
import { getCurrentUser } from '../../app/DataBase/UsersClient';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';

const userList = [
  {
    id: 1,
    role: 'SA',
    name: 'Jason Alexander',
    email: 'jason@ui-lib.com',
    avatar: '/assets/images/face-6.jpg',
    phone: '0123456789',
  },
];

// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email , password } = JSON.parse(config.data);

    let { error } = await signIn(email, password)

    if (error) {
        return [400, { message: 'Invalid email or password' }];
    };

    let user = await getCurrentUser();

    let profile  = await getProfileById(user.id);
    
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });
    
    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          avatar: profile[0].avatar,
          email: user.email,
          name: profile[0].name,
          role: profile[0].role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onPost('/api/auth/register').reply(async (config) => {
  try {
    const { email,password,name,role,phone,avatar,  } = JSON.parse(config.data);

    console.log(email,password,name,role,phone,avatar);

    let { error } = await signUp(email, password,role,name,phone,avatar);

    if (error) {
        return [400, { message: 'Invalid email or password' }];
    };

    let user = await getCurrentUser();

    let profile  = await getProfileById(user.id);

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          avatar: profile[0].avatar,
          email: user.email,
          name: profile[0].name,
          role: profile[0].role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

Mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = userList.find((u) => u.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
