import React, { useState, useEffect } from 'react'
import { SetupAxiosInterceptors } from '../utils/SetupAxiosInterceptors'

const AuthContext = React.createContext({
  user: '',
  login: () => {},
  logout: () => {},
  loading: true,
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionStorage.authenticatedUser) {
      console.log('user found in sessionStorage, setting the user...')
      setUser(sessionStorage.authenticatedUser)
      SetupAxiosInterceptors(sessionStorage.token)
    }
    setLoading(false)
  }, [])

  const login = (username, token) => {
    console.log('logging in... ', username, token)
    SetupAxiosInterceptors(token)
    sessionStorage.setItem('authenticatedUser', username)
    sessionStorage.setItem('token', token)
    setUser(username)
    setLoading(false)
  }

  const logout = () => {
    sessionStorage.removeItem('authenticatedUser')
    sessionStorage.removeItem('token')
    setUser('')
    setLoading(false)
  }

  const isLoggedIn = user !== '' ? true : false

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
