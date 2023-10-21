import {
    FETCH_BUDGETS,
    FETCH_BUDGET,
    ADD_BUDGET,
    UPDATE_BUDGET,
    DELETE_BUDGET,
} from '../actions/BudgetActions';

const initialState = [
];

const BudgetReducer = function (state = initialState, action) {
    switch (action.type) {
        case FETCH_BUDGETS: {
            return [...action.payload];
        }
        case FETCH_BUDGET: {
            return [...action.payload];
        }
        case ADD_BUDGET: {
            return [...action.payload];
        }
        case UPDATE_BUDGET: {
            return [...action.payload];
        }
        case DELETE_BUDGET: {
            return [...action.payload];
        }
        default: {
            return [...state];
        }
    }
}

export default BudgetReducer;