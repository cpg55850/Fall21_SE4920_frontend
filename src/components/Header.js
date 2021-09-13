import React, { useContext } from 'react'
import { Container, Nav, Navbar, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AlertContext } from '../context/AlertContext'

const Header = () => {
  const { alert } = useContext(AlertContext)

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
                <Link to="/dashboard/default">Dashboard</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/todos">Todos</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
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
