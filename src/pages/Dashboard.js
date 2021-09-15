import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Welcome = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome, {user ? user : ''}</h1>
      <Link to="/todos">Manage Todos</Link>
    </div>
  )
}

export default Welcome
