const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET

const User = require('../model/User')

// Funzione per generare un token JWT
function generateToken(user) {
  const payload = {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    street: user.street,
    money: user.money,
    isAdmin: user.isAdmin,
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

// Rotta per il login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email) {
    res.status(401).end()
    return
  }
  try {
    // Verifica le credenziali di accesso
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json('Utente non trovato')
    }
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      return res.status(404).json('Password non corretta')
    }

    // Genera il token JWT
    const token = generateToken(user)

    res.json({ token })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

// Rotta per la registrazione
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, street } = req.body

  // Verifica se l'utente esiste già
  const userExists = await User.findOne({ email: email })
  if (userExists) {
    return res.status(400).json({ message: 'Utente già registrato' })
  }

  // Hash della password
  const hashedPassword = bcrypt.hashSync(password, 10)

  // Crea un nuovo utente
  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
    street: street,
  })

  // Aggiungi il nuovo utente al database
  await user.save()

  // Genera il token JWT
  const token = generateToken(user)

  res.json({ token })
})

router.post('/verifyrole', async (req, res) => {
  const { token } = req.body
  try {
    const decodedToken = jwt.verify(token, secretKey)
    const userRole = decodedToken.isAdmin
    res.json({ decodedToken })
  } catch (error) {
    console.log(error)
  }
})

router.post('/user', async (req, res) => {
  const { token } = req.body
  try {
    const decodedToken = jwt.verify(token, secretKey)
    res.json({ decodedToken })
  } catch (error) {
    console.log(error)
  }
})

router.post('/getmoneyaviable', async (req, res) => {
  const { token } = req.body
  try {
    const decodedToken = jwt.verify(token, secretKey)
    const id = decodedToken.id
    const userExists = await User.findOne({ _id: id })
    const money = userExists.money
    res.json({ money })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
