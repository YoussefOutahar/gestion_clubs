import {
    FETCH_MEETINGS,
    FETCH_MEETING,
    ADD_MEETING,
    UPDATE_MEETING,
    DELETE_MEETING,
} from '../actions/MeetingsActions';

const initialState = [];

const MeetingsReducer = function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MEETINGS: {
            return [...action.payload];
        }
        case FETCH_MEETING: {
            return [...action.payload];
        }
        case ADD_MEETING: {
            return [...action.payload];
        }
        case UPDATE_MEETING: {
            return [...action.payload];
        }
        case DELETE_MEETING: {
            return [...action.payload];
        }
        default: {
            return [...state];
        }
    }
}

export default MeetingsReducer;