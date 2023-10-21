import { useContext } from 'react'
import MeetingsContext from '../contexts/MeetingsContext'

const useMeetings = () => useContext(MeetingsContext)

export default useMeetings