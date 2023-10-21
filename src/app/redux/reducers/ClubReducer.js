import {
    FETCH_CLUBS,
    FETCH_CLUB,
    ADD_CLUB,
    UPDATE_CLUB,
    DELETE_CLUB,
    FETCH_CLUB_CATEGORY,
    FETCH_CLUB_MEMBERS,
    FETCH_CLUB_EVENTS,
    FETCH_CLUB_ACTIVITIES,
} from '../actions/ClubActions';

const initialState = [
];

const ClubReducer = function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CLUBS: {
            return [...action.payload];
        }
        case FETCH_CLUB: {
            return [...action.payload];
        }
        case ADD_CLUB: {
            return [...action.payload];
        }
        case UPDATE_CLUB: {
            return [...action.payload];
        }
        case DELETE_CLUB: {
            return [...action.payload];
        }
        case FETCH_CLUB_CATEGORY: {
            return [...action.payload];
        }
        case FETCH_CLUB_MEMBERS: {
            return [...action.payload];
        }
        case FETCH_CLUB_EVENTS: {
            return [...action.payload];
        }
        case FETCH_CLUB_ACTIVITIES: {
            return [...action.payload];
        }
        default: {
            return [...state];
        }
    }
}

export default ClubReducer;