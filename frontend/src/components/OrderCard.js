import Card from 'react-bootstrap/Card'

function OrderCard({ order }) {
  return (
    <Card>
      <Card.Header as="h5">
        <b>Order id:</b> {order.orderId}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <b>Order status:</b>
          {order.status}
        </Card.Title>
        <Card.Text>
          {' '}
          <b>Products:</b>
        </Card.Text>
        {order.products.map((product) => (
          <div key={product.productId}>
            <Card.Img
              src={product.image}
              alt="product"
              style={{ width: '200px' }}
            />
            <p>
              <b>Quantity:</b> {product.quantity}
            </p>
            <p>
              <b>Price:</b> {product.price}€
            </p>
          </div>
        ))}
        <Card.Footer as="h5">
          <b>Total price:</b>
          {order.cost}€
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}

export default OrderCard
