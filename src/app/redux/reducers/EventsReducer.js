import {
    FETCH_EVENTS,
    FETCH_EVENT,
    ADD_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
} from '../actions/EventsActions';

const initialState = [];

const EventsReducer = function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EVENTS: {
            return [...action.payload];
        }
        case FETCH_EVENT: {
            return [...action.payload];
        }
        case ADD_EVENT: {
            return [...action.payload];
        }
        case UPDATE_EVENT: {
            return [...action.payload];
        }
        case DELETE_EVENT: {
            return [...action.payload];
        }
        default: {
            return [...state];
        }
    }
}

export default EventsReducer;