import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const Navigation = ({ user, handleLogout }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4 px-3">
      <Container fluid>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            users
          </Nav.Link>
        </Nav>
        <Navbar.Text className="me-3">{user.name} logged in</Navbar.Text>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          logout
        </Button>
      </Container>
    </Navbar>
  )
}

export default Navigation
