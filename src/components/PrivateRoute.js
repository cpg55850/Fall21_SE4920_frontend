import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth()

  return (
    <Route
      render={(props) =>
        !isLoggedIn ? <Redirect to="/login" /> : <Component {...props} />
      }
      {...rest}
    />
  )
}

export default PrivateRoute
