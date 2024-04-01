import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './screens/Homepage'
import Login from './screens/Login'
import SignIn from './screens/SignIn'
import Chartpage from './screens/Chartpage'
import Productpage from './screens/Productpage'
import Orderpage from './screens/Orderpage'
import Profilepage from './screens/Profilepage'

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/chart" element={<Chartpage />}></Route>
          <Route path="/product/:productId" element={<Productpage />} />
          <Route path="/order" element={<Orderpage />}></Route>
          <Route path="/profile" element={<Profilepage />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
