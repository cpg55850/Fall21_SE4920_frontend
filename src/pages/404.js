import React from 'react'
import { useLocation } from 'react-router'

const Error = () => {
  const { pathname } = useLocation()
  return (
    <div>
      <h1>404 Error</h1>
      <p>Sorry, a page for {pathname} could not be found.</p>
    </div>
  )
}

export default Error
