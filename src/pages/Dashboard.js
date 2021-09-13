import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const Welcome = () => {
  const { name } = useParams()

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <Link to="/todos">Manage Todos</Link>
    </div>
  )
}

export default Welcome
