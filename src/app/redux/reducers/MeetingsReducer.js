import {
    GET_MEETINGS,
    GET_MEETING,
    ADD_MEETING,
    UPDATE_MEETING,
    DELETE_MEETING,
} from '../actions/MeetingsActions';

const initialState = [];

const MeetingsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_MEETINGS: {
            return [...action.payload];
        }
        case GET_MEETING: {
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