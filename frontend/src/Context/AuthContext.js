import React, {
  createContext, 
  useState,
  useEffect
} from 'react'

import Spinner from '../Components/Spinner'

// import AuthService from '../Services/AuthService'

export const AuthContext = createContext()

// children below refer to the components we want to wrap our context with
const AuthProvider = ({ children }) => {
  // Get user from localStorage
let savedUser

  const [ user, setUser ] = useState(null)
  const [ goals, setGoals ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ isError, setIsError ] = useState(false)
  const [ isSuccess, setIsSuccess ] = useState(false)
  const [ errMessage, setErrMessage ] = useState("")

  function getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  useEffect( () => {
    savedUser = getUser()
    if (savedUser) {
      setUser(savedUser)
      setIsLoading(false)
    } else {
      setUser(null)
      setIsLoading(false)
    }
  }, [])

  return (
    <div>
      {
        isLoading ? 
        <Spinner /> :
        <AuthContext.Provider value = { 
          {
            user, setUser, 
            goals, setGoals,
            isLoading, setIsLoading,
            isError, setIsError,
            isSuccess, setIsSuccess,
            errMessage, setErrMessage
          }
        }>
          { children }
        </AuthContext.Provider>
      }
    </div>
  )
}

export default AuthProvider