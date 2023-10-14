import React, { createContext, useEffect, useReducer } from 'react'
import RootReducer from '../redux/reducers/RootReducer';

import ClubsService from '../DataBase/services/ClubsService';

import {
    FETCH_CLUBS,
    FETCH_CLUB,
    ADD_CLUB,
    UPDATE_CLUB,
    DELETE_CLUB,
    FETCH_CLUB_MEMBERS,
    FETCH_CLUB_EVENTS,
    FETCH_CLUB_ACTIVITIES,
} from '../redux/actions/ClubActions';

const ClubsContext = createContext({
    clubs: [],
    getClubs: () => {},
    createClub: () => {},
    deleteClub: () => {},
    updateClub: () => {},
})

export const ClubsProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(RootReducer, [])

    const getClubs = async () => {
        try {
            const res = await ClubsService.getClubs();
            dispatch({
                type: FETCH_CLUBS,
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const createClub = async (club) => {
        try {
            const res = await axios.post('/api/club/create', club)
            dispatch({
                type: 'CREATE_CLUB',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteClub = async (clubID) => {
        try {
            const res = await axios.post('/api/club/delete', {
                id: clubID,
            })
            dispatch({
                type: 'DELETE_CLUB',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const updateClub = async (club) => {
        try {
            const res = await axios.post('/api/club/update', club)
            dispatch({
                type: 'UPDATE_CLUB',
                payload: res.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getClubs()
    }, [])

    return (
        <ClubsContext.Provider
            value={{
                clubs: state.clubs,
                getClubs,
                createClub,
                deleteClub,
                updateClub,
            }}
        >
            {children}
        </ClubsContext.Provider>
    )
}

export default ClubsContext