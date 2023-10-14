import {
    FETCH_USERS,
    FETCH_USER,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
} from '../actions/UsersActions';

const initialState = [
];

const UsersReducer = function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS: {
            return [...action.payload];
        }
        case FETCH_USER: {
            return [...action.payload];
        }
        case ADD_USER: {
            return [...action.payload];
        }
        case UPDATE_USER: {
            return [...action.payload];
        }
        case DELETE_USER: {
            return [...action.payload];
        }
        default: {
            return [...state];
        }
    }
}

export default UsersReducer;