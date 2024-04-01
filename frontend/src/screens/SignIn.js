import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/esm/Container'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom'

function SignIn() {
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [street, setstreet] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [submitted, setsubmitted] = useState(false)

  async function signin(ev) {
    ev.preventDefault()
    try {
      if (
        firstname === '' ||
        lastname === '' ||
        street === '' ||
        email === '' ||
        password === '' ||
        confirmpassword === ''
      ) {
        Swal.fire('Oops', 'Fill in all fields!', 'error')
      } else {
        if (password === confirmpassword) {
          const response = await fetch(
            'http://localhost:5000/api/user/register/',
            {
              method: 'POST',
              body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                street: street,
              }),
              headers: { 'Content-Type': 'application/json' },
            }
          )
          if (response.ok) {
            Swal.fire('Congrats', 'You have registered successfully', 'success')
            setsubmitted(true)
          } else {
            Swal.fire('Oops', 'Something went wrong!', 'error')
          }
        }
      }
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong!', 'error')
    }
  }

  return (
    <Container>
      <h1 className="text-center pt-5 pb-3">Sign In</h1>
      <Form className="text-center">
        {' '}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <Form.Control
                onChange={(e) => setfirstname(e.target.value)}
                type="text"
                placeholder="Enter First Name"
              />
            </Col>
            <Col md="4"></Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <Form.Control
                onChange={(e) => setlastname(e.target.value)}
                type="text"
                placeholder="Enter Last Name"
              />
            </Col>
            <Col md="4"></Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Street</Form.Label>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <Form.Control
                onChange={(e) => setstreet(e.target.value)}
                type="text"
                placeholder="Enter Street"
              />
            </Col>
            <Col md="4"></Col>
          </Row>
        </Form.Group>
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
          <Form.Label>Insert Password</Form.Label>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Conferm Your Password</Form.Label>
          <Row>
            <Col md="4"></Col>
            <Col md="4" className="">
              <Form.Control
                onChange={(e) => setconfirmpassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Col>
            <Col md="4"></Col>
          </Row>
        </Form.Group>
        <Button onClick={signin} variant="dark" type="submit">
          Submit
        </Button>
      </Form>
      {submitted && <Navigate to="/" />}
    </Container>
  )
}

export default SignIn
