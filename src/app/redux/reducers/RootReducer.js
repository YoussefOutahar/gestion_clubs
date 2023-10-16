import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NotificationReducer from './NotificationReducer';

import UsersReducer from './UsersReducer';
import ClubReducer from './ClubReducer';
import MeetingReducer from './MeetingReducer';
import EventsReducer from './EventsReducer';

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  ecommerce: EcommerceReducer,
  users: UsersReducer,
  clubs: ClubReducer,
  meetings: MeetingReducer,
  events: EventsReducer,
});

export default RootReducer;
