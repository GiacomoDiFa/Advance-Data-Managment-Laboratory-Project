import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'

function Productpage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [desideredquantity, setdesideredquantity] = useState(0)
  const [availablequantity, setavailablequantity] = useState(0)

  async function addToChart(ev) {
    ev.preventDefault()
    const email = localStorage.getItem('user')
    if (email === 'null') {
      window.location.pathname = '/login'
    } else if (email !== 'null') {
      if (desideredquantity > availablequantity) {
        Swal.fire(
          'Oops',
          'Desidered Quantity Is Higher Than Available Quantity',
          'error'
        )
      } else {
        if (desideredquantity > 0) {
          try {
            const token = localStorage.getItem('token')
            const query = await fetch('http://localhost:5000/api/user/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
            })
            if (query.ok) {
              const decodedToken = await query.json()
              const id = decodedToken.decodedToken.id
              const response = await fetch(
                'http://localhost:5000/api/cart/addobjectcart',
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    id: id,
                    productid: productId,
                    quantity: desideredquantity,
                  }),
                }
              )
              if (response.ok) {
                window.location.pathname = '/chart'
              } else {
                Swal.fire('Oops', 'Something went wrong!', 'error')
              }
            }
          } catch (error) {
            Swal.fire('Oops', 'Something went wrong', 'error')
          }
        } else {
          Swal.fire('Oops', "Desidere quantity can't be zero", 'error')
        }
      }
    }
  }

  const increase = () => {
    setdesideredquantity(desideredquantity + 1)
  }

  const decrease = () => {
    if (desideredquantity > 0) {
      setdesideredquantity(desideredquantity - 1)
    }
  }
  useEffect(() => {
    const getProductDetails = async () => {
      const url = `http://localhost:5000/api/product/product/${productId}`
      try {
        const resp = await fetch(url)
        const data = await resp.json()
        setProduct(data)
      } catch (error) {
        console.log(error)
      }
    }

    const getAvailableQuantity = async () => {
      const url = `http://localhost:5000/api/catalog/quantity/${productId}`
      try {
        const resp = await fetch(url)
        const data = await resp.json()
        setavailablequantity(data)
      } catch (error) {
        console.log(error)
      }
    }

    getProductDetails()
    getAvailableQuantity() // Chiama la funzione per ottenere i dettagli del prodotto quando il componente viene montato
  }, [productId]) // Assicurati di passare `productId` come dipendenza per chiamare getProductDetails quando cambia

  if (!product) {
    return <Loader /> // Visualizza un messaggio di caricamento fino a quando i dettagli del prodotto non sono stati caricati
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }} className="mt-3">
            <Card.Img variant="top" src={product.image} className="" />
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '50rem' }}>
            <Card.Body>
              <Card.Title>
                <Col>
                  <b>Name:</b>&nbsp;{product.name}
                </Col>
                <Col></Col>
              </Card.Title>
              <Card.Text>
                <Col>
                  <b>Description:</b>
                </Col>
                <Col>{product.description}</Col>
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Row className="">
                  <Col className="">
                    <b>Category:&nbsp;</b>
                    {product.category}
                  </Col>
                  <Col className=""></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>
                  <b>Price:&nbsp;</b>
                  {product.price}€
                </Col>
                <Col></Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>
                  <b>Quantity available:&nbsp;</b>
                  {availablequantity}
                </Col>
                <Col></Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>
                  <b>Desired quantity:&nbsp;</b>
                  <Button onClick={decrease} variant="dark">
                    -
                  </Button>
                  {desideredquantity}
                  <Button onClick={increase} variant="dark">
                    +
                  </Button>
                </Col>
                <Col></Col>
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="dark" onClick={addToChart}>
                Add to the Chart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Productpage
