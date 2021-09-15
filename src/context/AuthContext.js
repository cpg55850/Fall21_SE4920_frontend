import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
  user: '',
  login: () => {},
  logout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('')

  useEffect(() => {
    if (sessionStorage.authenticatedUser) {
      console.log('user found in sessionStorage, setting the user...')
      setUser(sessionStorage.authenticatedUser)
    }
  }, [])

  const login = (user) => {
    sessionStorage.setItem('authenticatedUser', user)
    setUser(user)
  }

  const logout = () => {
    sessionStorage.removeItem('authenticatedUser')
    setUser('')
  }

  const isLoggedIn = user !== '' ? true : false

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
