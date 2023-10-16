import React, { createContext, useEffect, useReducer } from 'react'
import MeetingsService from '../DataBase/services/MeetingsService';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_MEETINGS': {
            return {
                ...state,
                meetings: action.payload,
            }
        }
        case 'FETCH_MEETING': {
            return {
                ...state,
                meetings: action.payload,
            }
        }
        case 'ADD_MEETING': {
            return {
                ...state,
                meetings: action.payload,
            }
        }
        case 'UPDATE_MEETING': {
            return {
                ...state,
                meetings: action.payload,
            }
        }
        case 'DELETE_MEETING': {
            return {
                ...state,
                meetings: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const MeetingsContext = createContext({
    meetings: [],
    getMeetings: () => Promise.resolve(),
    createMeeting: () => Promise.resolve(),
    deleteMeeting: () => Promise.resolve(),
    updateMeeting: () => Promise.resolve(),
})

export const MeetingsProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const getMeetings = async () => {
        try {
            const res = await MeetingsService.getMeetings();
            dispatch({
                type: `FETCH_MEETINGS`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getMeeting = async (id) => {
        try {
            const res = await MeetingsService.getMeeting(id);
            dispatch({
                type: `FETCH_MEETING`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const createMeeting = async (meeting) => {
        try {
            const res = await MeetingsService.createMeeting(meeting);
            dispatch({
                type: `ADD_MEETING`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const updateMeeting = async (id, meeting) => {
        try {
            const res = await MeetingsService.updateMeeting(id, meeting);
            dispatch({
                type: `UPDATE_MEETING`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const deleteMeeting = async (id) => {
        try {
            const res = await MeetingsService.deleteMeeting(id);
            dispatch({
                type: `DELETE_MEETING`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMeetings();
    }, [])

    return (
        <MeetingsContext.Provider
            value={{
                meetings: state.meetings,
                getMeetings,
                getMeeting,
                createMeeting,
                deleteMeeting,
                updateMeeting,
            }}
        >
            {children}
        </MeetingsContext.Provider>
    )
}