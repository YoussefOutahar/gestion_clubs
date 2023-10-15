import React, { createContext, useEffect, useReducer } from 'react'

import ClubsService from '../DataBase/services/ClubsService';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CLUBS': {
            return {
                ...state,
                clubs: action.payload,
            }
        }
        case 'FETCH_CLUB': {
            return {
                ...state,
                clubs: action.payload,
            }
        }
        case 'ADD_CLUB': {
            return {
                ...state,
                clubs: action.payload,
            }
        }
        case 'UPDATE_CLUB': {
            return {
                ...state,
                clubs: action.payload,
            }
        }
        case 'DELETE_CLUB': {
            return {
                ...state,
                clubs: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const ClubsContext = createContext({
    clubs: [],
    getClubs: () => Promise.resolve(),
    createClub: () => Promise.resolve(),
    deleteClub: () => Promise.resolve(),
    updateClub: () => Promise.resolve(),
})

export const ClubsProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const getClubs = async () => {
        try {
            const res = await ClubsService.getClubs();
            dispatch({
                type: FETCH_CLUBS,
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const createClub = async (club) => {
        try {
            await ClubsService.createClub(club);
            const res = await ClubsService.getClubs();
            dispatch({
                type: 'CREATE_CLUB',
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const deleteClub = async (clubID) => {
        try {
            await ClubsService.deleteClub(clubID);
            const res = await ClubsService.getClubs();
            dispatch({
                type: 'DELETE_CLUB',
                payload: res,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const updateClub = async (club) => {
        try {
            await ClubsService.updateClub(club);
            const res = await ClubsService.getClubs();
            dispatch({
                type: 'UPDATE_CLUB',
                payload: res,
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