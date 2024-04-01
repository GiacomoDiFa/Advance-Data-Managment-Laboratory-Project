import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit'

export default function App() {
  return (
    <MDBFooter className="text-center mt-5" color="white" bgColor="dark">
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2024 Copyright: Giacomo Di Fabrizio
      </div>
    </MDBFooter>
  )
}
