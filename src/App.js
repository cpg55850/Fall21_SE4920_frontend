import React, { useContext } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Alert } from 'react-bootstrap'
import Error from './pages/404'
import Dashboard from './pages/Dashboard'
import Todos from './components/Todos'
import Header from './components/Header'
import { AlertContextProvider } from './context/AlertContext'
import Todo from './components/Todo'

const App = () => {
  return (
    <AlertContextProvider>
      <Router>
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route exact path="/todos" component={Todos} />
            <Route path="/todos/:id" component={Todo} />
            <Route path="/dashboard/:name" component={Dashboard} />
            <Route path="*" component={Error} />
          </Switch>
        </Container>
      </Router>
    </AlertContextProvider>
  )
}

export default App
