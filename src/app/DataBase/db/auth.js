import jwt from 'jsonwebtoken';
import Mock from '../mock';

import { signIn , signUp} from '../Clients/AuthClient';
import { getCurrentUser, getProfileById } from '../Clients/UsersClient';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';

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

Mock.onGet('/api/auth/profile').reply(async (config) => {
  try {
    const { Authorization } = config.headers;

    console.log(Authorization);

    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }
    
    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);

    // const user = userList.find((u) => u.id === userId);

    let user = await getCurrentUser();
    let profile  = await getProfileById(user.id);
    
    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }
    return [
      200,
      {
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
