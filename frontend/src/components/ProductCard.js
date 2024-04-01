import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link, Navigate } from 'react-router-dom'

function ProductCard({ product }) {
  const handleClick = () => {
    ;<Navigate></Navigate>
  }
  return (
    <Link to={`/product/${product._id}`}>
      <Card style={{ width: '18rem' }} className="mt-3" onClick={handleClick}>
        <Card.Img
          variant="top"
          src={product.image}
          style={{ width: '250px', height: '250px' }}
          className=""
        />
        <Card.Footer>
          <b>Title:</b>&nbsp;{product.name}
        </Card.Footer>
        <Card.Footer>
          <b>Price:</b>&nbsp;
          {product.price}€
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default ProductCard
