import React from 'react'
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit'

export default function App() {
  return (
    <MDBCarousel showControls>
      <MDBCarouselItem itemId={1}>
        <img
          src="https://mdbootstrap.com/img/new/slides/041.jpg"
          className="d-block w-100"
          alt="..."
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img
          src="https://mdbootstrap.com/img/new/slides/042.jpg"
          className="d-block w-100"
          alt="..."
        />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img
          src="https://mdbootstrap.com/img/new/slides/043.jpg"
          className="d-block w-100"
          alt="..."
        />
      </MDBCarouselItem>
    </MDBCarousel>
  )
}
