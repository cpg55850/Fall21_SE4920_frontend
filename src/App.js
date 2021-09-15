import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Error from './pages/404'
import Dashboard from './pages/Dashboard'
import Todos from './components/Todos'
import Header from './components/Header'
import { AlertContextProvider } from './context/AlertContext'
import { AuthContextProvider } from './context/AuthContext'
import Todo from './components/Todo'
import Logout from './pages/Logout'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/logout" component={Logout} />
              <PrivateRoute exact path="/todos" component={Todos} />
              <PrivateRoute path="/todos/:id" component={Todo} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="*" component={Error} />
            </Switch>
          </Container>
        </Router>
      </AlertContextProvider>
    </AuthContextProvider>
  )
}

export default App
