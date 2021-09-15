import React from 'react'
import { Container, Nav, Navbar, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAlert } from '../context/AlertContext'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { alert } = useAlert()
  const { isLoggedIn, user } = useAuth()

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>TodoApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/dashboard">Dashboard</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/todos">Todos</Link>
              </Nav.Link>
              {isLoggedIn ? (
                <Nav.Link>
                  <Link to="/logout">Logout</Link>
                </Nav.Link>
              ) : (
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <Navbar.Text>
                Signed in as: <Link to="/login">{user}</Link>
              </Navbar.Text>
            ) : (
              <Navbar.Text>Not logged in</Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {alert.message && <Alert variant="danger">{alert.message}</Alert>}
      </Container>
    </>
  )
}

export default Header
