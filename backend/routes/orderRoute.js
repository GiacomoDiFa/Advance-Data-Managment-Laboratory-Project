const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../model/Order')
const User = require('../model/User')
const Product = require('../model/Products')
const Cart = require('../model/Cart')
const Catalog = require('../model/Catalog')

router.post('/addorder', async (req, res) => {
  try {
    const { id } = req.body
    // Find user by email
    const user = await User.findOne({ _id: id })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const userId = user._id
    // Find items in user's cart
    const carts = await Cart.find({ userid: userId })
    if (!carts) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    let productsInfo = []
    for (const cart of carts) {
      for (const item of cart.items) {
        const product = await Product.findById(item.productid)
        // Se il prodotto esiste, aggiungi titolo, immagine e quantità all'array 'productsInfo'
        if (product) {
          productsInfo.push({
            productid: product._id,
            quantity: item.quantity,
            price: product.price,
          })
          // Aggiorna la quantità disponibile nel catalogo
          await Catalog.findOneAndUpdate(
            { product: product._id },
            { $inc: { quantity: -item.quantity } }
          )
        }
      }
    }
    let totalcost = 0
    for (const item of productsInfo) {
      totalcost += parseInt(item.quantity) * parseFloat(item.price)
    }
    // Create new order
    const newOrder = new Order({
      userid: userId,
      items: productsInfo,
      cost: totalcost,
    })
    user.money -= totalcost
    if (user.money < 0) {
      res.status(404).json({ error: "You don't have enough money" })
    } else {
      await newOrder.save()
      await user.save()
      res
        .status(201)
        .json({ message: 'Order added successfully', order: newOrder })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error adding order' })
  }
})

router.post('/getorders', async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.findOne({ _id: id })
    const userId = user._id
    const orders = await Order.find({ userid: userId })

    // Array per memorizzare gli ordini con i dettagli dei prodotti
    const ordersWithProducts = []

    // Per ogni ordine trovato, ottenere i dettagli dei prodotti
    for (const order of orders) {
      const orderWithProducts = {
        orderId: order._id,
        cost: order.cost,
        status: order.status,
        products: [],
      }

      // Per ogni elemento dell'ordine, trovare il prodotto corrispondente
      for (const item of order.items) {
        // Trova il prodotto utilizzando l'ID del prodotto nell'elemento dell'ordine
        const product = await Product.findById(item.productid)

        // Aggiungi i dettagli del prodotto all'ordine
        orderWithProducts.products.push({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity: item.quantity,
          price: product.price,
          // Aggiungi altri campi del prodotto se necessario
        })
      }

      // Aggiungi l'ordine con i dettagli dei prodotti all'array
      ordersWithProducts.push(orderWithProducts)
    }
    res.json({ orders: ordersWithProducts })
  } catch (error) {
    res.status(500).json({ error: 'Error getting orders' })
  }
})

module.exports = router
