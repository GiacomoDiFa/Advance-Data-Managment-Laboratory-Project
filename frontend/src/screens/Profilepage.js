import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Loader from '../components/Loader'
import ProfileCard from '../components/ProfileCard'

function Profilepage() {
  const [user, setuser] = useState()
  const [loading, setloading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      setloading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/user/user', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        let user = await response.json()
        setuser(user)
        setloading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      {loading ? <Loader /> : <ProfileCard user={user.decodedToken} />}
    </Container>
  )
}

export default Profilepage
