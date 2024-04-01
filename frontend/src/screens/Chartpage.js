import React, { useEffect, useState } from 'react'
import ChartCard from '../components/ChartCard'
import Container from 'react-bootstrap/esm/Container'
import Loader from '../components/Loader'
import Button from 'react-bootstrap/esm/Button'
import Row from 'react-bootstrap/esm/Row'
import Swal from 'sweetalert2'

function Chartpage() {
  const [cartlist, setcartlist] = useState([])
  const [loading, setloading] = useState(true)
  const [lenghtcart, setlenghtcart] = useState(0)
  const [totalprice, settotalprice] = useState(0)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user === 'null') {
      window.location.pathname = '/login'
    }
    getChartData()
  }, [])

  useEffect(() => {
    calculateTotalPrice()
  }, [cartlist])

  function calculateTotalPrice() {
    let totalprice = 0
    cartlist.forEach((product) => {
      totalprice += parseFloat(product.price) * parseFloat(product.quantity)
    })
    settotalprice(totalprice)
  }

  async function getChartData() {
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
        const response = await fetch('http://localhost:5000/api/cart/getcart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setcartlist(data)
          setlenghtcart(data.length)
          console.log(data.length)
          setloading(false)
        } else {
          setloading(true)
        }
      }
    } catch (error) {
      setloading(true)
    }
  }

  async function buy(ev) {
    ev.preventDefault()
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
          'http://localhost:5000/api/order/addorder',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          }
        )
        if (response.ok) {
          const response2 = await fetch(
            'http://localhost:5000/api/cart/deletecart',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id }),
            }
          )
          if (response2.ok) {
            window.location.pathname = '/order'
          }
        } else {
          Swal.fire(
            'Oops',
            "Something went wrong! Maybe you don't have enough money",
            'error'
          )
        }
      }
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong!', 'error')
    }
  }
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        cartlist.map((product) => (
          <ChartCard
            key={product.id}
            id={product.id}
            name={product.title}
            image={product.image}
            quantity={product.quantity}
            price={product.price}
          />
        ))
      )}
      {lenghtcart === 0 ? (
        <div className="text-center mt-5">
          <h1>The chart is empty</h1>
        </div>
      ) : (
        <>
          <Row>
            <b className="mb-3">Total Price: {totalprice}€</b>
            {/* Bottone "Buy now" in basso a destra */}
            <Button variant="dark" onClick={buy}>
              Buy now
            </Button>
          </Row>
        </>
      )}
    </Container>
  )
}

export default Chartpage
