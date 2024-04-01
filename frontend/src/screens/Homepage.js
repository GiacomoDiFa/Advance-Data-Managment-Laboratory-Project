import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Loader from '../components/Loader'

function Homepage() {
  const [productlist, setproductlist] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const url = 'http://localhost:5000/api/product/getallproduct'
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      setproductlist(data)
      setloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const filterProducts = async (category) => {
    setloading(true)
    const url = `http://localhost:5000/api/product/product/category/${category}`
    try {
      const resp = await fetch(url)
      const data = await resp.json()
      setproductlist(data)
      setloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Row className="">
        <Col xs="12" className="d-inline-flex">
          <Button className="me-2" variant="dark" onClick={() => getData()}>
            All Products
          </Button>
          <Button
            variant="dark"
            className="me-2"
            onClick={() => filterProducts("men's clothing")}
          >
            Men Products
          </Button>
          <Button
            variant="dark"
            className="me-2"
            onClick={() => filterProducts("women's clothing")}
          >
            Women Products
          </Button>
          <Button
            variant="dark"
            className="me-2"
            onClick={() => filterProducts('electronics')}
          >
            Electronics
          </Button>
          <Button
            variant="dark"
            className="me-2"
            onClick={() => filterProducts('jewelery')}
          >
            Jewelery
          </Button>
        </Col>
      </Row>

      <Container>
        <Row className=" pt-5">
          {loading ? (
            <Loader />
          ) : (
            productlist.map((product) => (
              <Col key={product._id} lg="3" md="3" xs="12" className="ps-5">
                <ProductCard product={product} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  )
}

export default Homepage
