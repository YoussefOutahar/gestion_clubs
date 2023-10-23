import React, { createContext, useEffect, useReducer } from 'react'

import BudgetService from '../DataBase/services/BudgetService'

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_BUDGETS': {
            return {
                ...state,
                budgets: action.payload,
            }
        }
        case 'FETCH_BUDGET': {
            return {
                ...state,
                budgets: action.payload,
            }
        }
        case 'ADD_BUDGET': {
            return {
                ...state,
                budgets: action.payload,
            }
        }
        case 'UPDATE_BUDGET': {
            return {
                ...state,
                budgets: action.payload,
            }
        }
        case 'DELETE_BUDGET': {
            return {
                ...state,
                budgets: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const BudgetsContext = createContext({
    budgets: [],
    getBudgets: () => Promise.resolve(),
    createBudget: () => Promise.resolve(),
    deleteBudget: () => Promise.resolve(),
    updateBudget: () => Promise.resolve(),
})

export const BudgetsProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const getBudgets = async () => {
        try {
            const res = await BudgetService.getBudgets();
            dispatch({
                type: `FETCH_BUDGETS`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const createBudget = async (budget) => {
        try {
            const res = await BudgetService.createBudget(budget);
            dispatch({
                type: `ADD_BUDGET`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const updateBudget = async (budget) => {
        try {
            const res = await BudgetService.updateBudget(budget);
            dispatch({
                type: `UPDATE_BUDGET`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const deleteBudget = async (budget) => {
        try {
            const res = await BudgetService.deleteBudget(budget);
            dispatch({
                type: `DELETE_BUDGET`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBudgets();
    }, [])

    const value = {
        ...state.budgets,
        getBudgets,
        createBudget,
        deleteBudget,
        updateBudget,
    }

    return (
        <BudgetsContext.Provider value={value}>
            {children}
        </BudgetsContext.Provider>
    )
}

export default BudgetsContext