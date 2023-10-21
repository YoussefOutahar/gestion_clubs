import { useContext } from 'react'
import EventsContext from '../contexts/EventsContext'

const useEvents = () => useContext(EventsContext)

export default useEvents