const express = require('express')
const router = express.Router()
const fs = require('fs')

const Product = require('../model/Products')

const jsonData = JSON.parse(
  fs.readFileSync('../backend/filtered_data.json', 'utf-8')
)

//Route for specific object
router.get('/product/:id', async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findOne({ _id: id })
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.send(product)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

//Route for filter by category
router.get('/product/category/:category', async (req, res) => {
  const category = req.params.category.toLowerCase()
  try {
    const products = await Product.find({ category })
    res.send(products)
  } catch (error) {
    return res.status(404).json(error)
  }
})

//Route for get all Products
router.get('/getallproduct', async (req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (error) {
    return res.status(404).json(error)
  }
})

//Route for add all product from json file inside the server
router.get('/addallproduct', async (req, res) => {
  try {
    const result = await Product.insertMany(jsonData)
    res.send(result)
  } catch (error) {
    return res.status(404).json(error)
  }
})

module.exports = router
