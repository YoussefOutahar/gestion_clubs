import { useContext } from 'react'
import ClubsContext from '../contexts/ClubsContext'

const useClubs = () => useContext(ClubsContext)

export default useClubs