import React, { createContext, useEffect, useReducer } from 'react'
import UsersService from '../DataBase/services/UsersService';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_USERS': {
            return {
                ...state,
                users: action.payload,
            }
        }
        case 'FETCH_USER': {
            return {
                ...state,
                users: action.payload,
            }
        }
        case 'ADD_USER': {
            return {
                ...state,
                users: action.payload,
            }
        }
        case 'UPDATE_USER': {
            return {
                ...state,
                users: action.payload,
            }
        }
        case 'DELETE_USER': {
            return {
                ...state,
                users: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}


const UsersContext = createContext({
    users: [],
    getUsers: () => Promise.resolve(),
    createUser: () => Promise.resolve(),
    deleteUser: () => Promise.resolve(),
    updateUser: () => Promise.resolve(),
})

export const UsersProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const getUsers = async () => {
        try {
            const res = await UsersService.getUsers();
            dispatch({
                type: `FETCH_USERS`,
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const createUser = async (user) => {
        try {
            await UsersService.createUser(user);
            const res = await UsersService.getUsers();
            dispatch({
                type: 'CREATE_USER',
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteUser = async (userID) => {
        try {
            await UsersService.deleteUser(userID);
            const res = await UsersService.getUsers();
            dispatch({
                type: 'DELETE_USER',
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const updateUser = async (userID,user) => {
        try {
            await UsersService.updateUser(userID,user);
            const res = await UsersService.getUsers();
            dispatch({
                type: 'UPDATE_USER',
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <UsersContext.Provider
            value={{
                users: state.users,
                getUsers,
                createUser,
                deleteUser,
                updateUser,
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContext