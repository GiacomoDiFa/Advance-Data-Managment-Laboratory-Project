import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import Container from 'react-bootstrap/esm/Container'

function Orderpage() {
  const [orderlist, setorderlist] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      setloading(true)
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
          'http://localhost:5000/api/order/getorders',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          }
        )
        const data = await response.json()
        setorderlist(data.orders)
        setloading(false)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
  return (
    <Container>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {orderlist.map((order) => (
            <div key={order.orderId}>
              <OrderCard order={order}></OrderCard>
            </div>
          ))}
        </>
      )}
    </Container>
  )
}

export default Orderpage
