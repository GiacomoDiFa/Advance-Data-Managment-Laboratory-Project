import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function ChartCard({ id, name, image, quantity, price }) {
  async function removeItem(ev) {
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
        const userid = decodedToken.decodedToken.id

        const response = await fetch(
          'http://localhost:5000/api/cart/deleteobjectcart',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userid, product: id }),
          }
        )
        console.log(response)
        if (response.ok) {
          window.location.reload()
        } else {
          console.log('error')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className="mb-3">
      <Card.Header>Product</Card.Header>
      <Card.Body className="d-flex flex-column">
        <div>
          <Card.Title>{name}</Card.Title>
          {/* Aggiungi la classe "img-fluid" per rendere l'immagine responsiva */}
          <Card.Img
            src={image}
            className="img-fluid mb-5"
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
          <Card.Subtitle>
            <b>Quantity:</b> {quantity}
          </Card.Subtitle>
          <Card.Subtitle>
            <b>Price per unit:</b> {price}€
          </Card.Subtitle>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div></div> {/* Empty div for spacing */}
          <Button onClick={removeItem} variant="dark">
            Remove from the cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ChartCard
