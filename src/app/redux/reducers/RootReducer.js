import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NotificationReducer from './NotificationReducer';

import UsersReducer from './UsersReducer';
import ClubReducer from './ClubReducer';
import MeetingReducer from './MeetingsReducer';
import EventsReducer from './EventsReducer';
import BudgetReducer from './BudgetReducer';

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  ecommerce: EcommerceReducer,
  users: UsersReducer,
  clubs: ClubReducer,
  meetings: MeetingReducer,
  events: EventsReducer,
  budgets: BudgetReducer,
});

export default RootReducer;
