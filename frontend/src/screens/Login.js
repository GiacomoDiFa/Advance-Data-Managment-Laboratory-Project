import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [submitted, setsubmitted] = useState(false)

  async function handleLogin(ev) {
    ev.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (response.ok) {
        const data = await response.json()
        const token = data.token
        localStorage.setItem('token', data.token)
        const response2 = await fetch('http://localhost:5000/api/user/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        const user = await response2.json()
        localStorage.setItem('user', user.decodedToken.email)
        localStorage.setItem('isAdmin', user.decodedToken.isAdmin)
        setsubmitted(true)
      } else {
        localStorage.setItem('token', 'null')
        localStorage.setItem('user', 'null')
        localStorage.setItem('isAdmin', 'null')
        Swal.fire('Oops', 'Something went wrong!', 'error')
      }
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong!', 'error')
    }
  }
  return (
    <Container>
      <h1 className="text-center pt-5 pb-3">Login</h1>
      <Form className="text-center">
        {' '}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <Form.Control
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Col>
            <Col md="4"></Col>
          </Row>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Row>
            <Col md="4"></Col>
            <Col md="4" className="">
              <Form.Control
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Col>
            <Col md="4"></Col>
          </Row>
        </Form.Group>
        <Button onClick={handleLogin} variant="dark" type="submit">
          Submit
        </Button>
      </Form>
      {submitted && <Navigate to="/" />}
    </Container>
  )
}

export default Login
