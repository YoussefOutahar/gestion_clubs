import React, { createContext, useEffect, useReducer } from 'react'
import RootReducer from '../redux/reducers/RootReducer';

import UsersService from '../DataBase/services/UsersService';

import {
    FETCH_USERS,
    FETCH_USER,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    FETCH_USER_CLUBS,
    FETCH_USER_EVENTS,
    FETCH_USER_ACTIVITIES,
} from '../redux/actions/UserActions';

const UsersContext = createContext({
    users: [],
    getUsers: () => {},
    createUser: () => {},
    deleteUser: () => {},
    updateUser: () => {},
})

export const UsersProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(RootReducer, [])

    const getUsers = async () => {
        try {
            const res = await UsersService.getUsers();
            dispatch({
                type: FETCH_USERS,
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const createUser = async (user) => {
        try {
            const res = await axios.post('/api/user/create', user)
            dispatch({
                type: 'CREATE_USER',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteUser = async (userID) => {
        try {
            const res = await axios.post('/api/user/delete', {
                id: userID,
            })
            dispatch({
                type: 'DELETE_USER',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const updateUser = async (user) => {
        try {
            const res = await axios.post('/api/user/update', user)
            dispatch({
                type: 'UPDATE_USER',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <UsersContext.Provider
            value={{
                users: state,
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