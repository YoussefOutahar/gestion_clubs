import React, { createContext, useEffect, useReducer } from 'react'
import EventsService from '../DataBase/services/EventsService';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_EVENTS': {
            return {
                ...state,
                events: action.payload,
            }
        }
        case 'FETCH_EVENT': {
            return {
                ...state,
                events: action.payload,
            }
        }
        case 'ADD_EVENT': {
            return {
                ...state,
                events: action.payload,
            }
        }
        case 'UPDATE_EVENT': {
            return {
                ...state,
                events: action.payload,
            }
        }
        case 'DELETE_EVENT': {
            return {
                ...state,
                events: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const EventsContext = createContext({
    events: [],
    getEvents: () => Promise.resolve(),
    createEvent: () => Promise.resolve(),
    deleteEvent: () => Promise.resolve(),
    updateEvent: () => Promise.resolve(),
})

export const EventsProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const getEvents = async () => {
        try {
            const res = await EventsService.getEvents();
            dispatch({
                type: `FETCH_EVENTS`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const createEvent = async (event) => {
        try {
            const res = await EventsService.createEvent(event);
            dispatch({
                type: `ADD_EVENT`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const deleteEvent = async (id) => {
        try {
            const res = await EventsService.deleteEvent(id);
            dispatch({
                type: `DELETE_EVENT`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const updateEvent = async (event) => {
        try {
            const res = await EventsService.updateEvent(event);
            dispatch({
                type: `UPDATE_EVENT`,
                payload: res,
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <EventsContext.Provider
            value={{
                events: state.events,
                getEvents,
                createEvent,
                deleteEvent,
                updateEvent,
            }}
        >
            {children}
        </EventsContext.Provider>
    )
}

export default EventsContext