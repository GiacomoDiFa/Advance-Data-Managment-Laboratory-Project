const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Cart = require('../model/Cart')
const User = require('../model/User')
const Product = require('../model/Products')

router.post('/getcart', async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.findOne({ _id: id })
    const userId = user._id
    const carts = await Cart.find({ userid: userId })

    // Array per memorizzare le informazioni sui prodotti
    let productsInfo = []

    // Per ogni oggetto 'cart' nell'array 'carts'
    for (const cart of carts) {
      // Per ogni oggetto 'item' all'interno dell'array 'items' in 'cart'
      for (const item of cart.items) {
        // Cerca il prodotto corrispondente utilizzando l'id del prodotto
        const product = await Product.findById(item.productid)
        // Se il prodotto esiste, aggiungi titolo e immagine all'array 'productsInfo'
        if (product) {
          productsInfo.push({
            id: product._id,
            title: product.name,
            image: product.image,
            quantity: item.quantity,
            price: product.price,
          })
        }
      }
    }
    res.send(productsInfo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error getting cart' })
  }
})

//Route for delete the specific cart for the user
router.post('/deletecart', async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.findOne({ _id: id })
    const userId = user.id
    const result = await Cart.deleteOne({ userid: userId })
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error deleting cart' })
  }
})

//Route for delete object in cart
router.post('/deleteobjectcart', async (req, res) => {
  try {
    const { id, product } = req.body
    const user = await User.findOne({ _id: id })
    const userId = user.id

    const cart = await Cart.findOne({ userid: userId })

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    const productId = typeof product === 'object' ? product._id : product
    // Filtriamo gli elementi del carrello per rimuovere quello con il productid specificato
    cart.items = cart.items.filter((item) => {
      return String(item.productid) !== product
    })

    // Salviamo il carrello aggiornato
    await cart.save()

    res
      .status(200)
      .json({ message: 'Object deleted from cart successfully', cart })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error deleting object in the cart' })
  }
})

//Route for add object (and his quantity) in the cart
router.post('/addobjectcart', async (req, res) => {
  try {
    const { id, productid, quantity } = req.body
    const user = await User.findOne({ _id: id })
    const userId = user.id

    let cart = await Cart.findOne({ userid: userId })

    if (!cart) {
      cart = new Cart({
        userid: userId,
        items: [{ productid: productid, quantity }],
      })
    } else {
      const existingItem = cart.items.find(
        (item) => String(item.productid) === String(productid)
      )

      if (existingItem) {
        existingItem.quantity += parseInt(quantity)
      } else {
        cart.items.push({ productid, quantity: parseInt(quantity) })
      }
    }

    await cart.save()
    res.status(200).json({ message: 'Object added to cart successfully', cart })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error adding object in the cart' })
  }
})

module.exports = router
