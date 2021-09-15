import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { EjectAxiosInterceptors } from '../utils/SetupAxiosInterceptors'

const Logout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
    EjectAxiosInterceptors()
  })

  return (
    <div>
      <h1>Logout Page</h1>
      <p>You've been logged out</p>
    </div>
  )
}

export default Logout
