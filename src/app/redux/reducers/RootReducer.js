import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NotificationReducer from './NotificationReducer';

import UsersReducer from './UsersReducer';
import ClubReducer from './ClubReducer';

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  ecommerce: EcommerceReducer,
  users: UsersReducer,
  clubs: ClubReducer,
});

export default RootReducer;
