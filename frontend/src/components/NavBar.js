import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavBar() {
  const [username, setusername] = useState('')
  const handleLogout = () => {
    localStorage.setItem('user', 'null')
    window.location.pathname = '/'
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('user')
    if (loggedUser !== 'null') {
      setusername(loggedUser)
    }
  }, [])
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container className="">
        <Navbar.Brand className="text-white">
          <Nav.Link href="/">ESHOP by GDF</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/signin" className="text-white ps-4 pe-4">
              Sign In
            </Nav.Link>
            {username ? (
              <>
                <NavDropdown
                  title={<span className="text-white">{username}</span>}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/order">My Orders</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/chart" className="text-white ps-4 pe-4">
                  Cart
                </Nav.Link>
                <Nav.Link
                  className="text-white ps-4 pe-4"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="text-white ps-4 pe-4">
                  Login
                </Nav.Link>
                <Nav.Link href="/chart" className="text-white ps-4 pe-4">
                  Chart
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
