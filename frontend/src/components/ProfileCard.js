import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function ProfileCard({ user }) {
  const [money, setmoney] = useState(0)
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://localhost:5000/api/user/getmoneyaviable',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        }
      )
      if (response.ok) {
        const result = await response.json()
        const money = result.money
        setmoney(money)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card>
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        <Card.Title>
          <b>Firstname:</b>
          {user.firstname}
        </Card.Title>
        <Card.Title>
          <b>Lastname:</b>
          {user.lastname}
        </Card.Title>
        <Card.Title>
          <b>Email:</b>
          {user.email}
        </Card.Title>
        <Card.Title>
          <b>Street:</b>
          {user.street}
        </Card.Title>
        <Card.Title>
          <b>Money:</b>
          {money}€
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default ProfileCard
