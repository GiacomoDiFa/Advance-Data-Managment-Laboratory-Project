// catalog.js
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Catalog = require('../model/Catalog')
const Product = require('../model/Products')

router.post('/addtocatalog', async (req, res) => {
  try {
    const { id, quantity } = req.body

    // Cerca il prodotto nel catalogo
    let productExist = await Catalog.findOne({
      product: id,
    })

    if (productExist) {
      // Se il prodotto esiste già, aggiorna la quantità
      productExist.quantity += parseInt(quantity)
      await productExist.save()
    } else {
      // Se il prodotto non esiste, crea un nuovo documento di catalogo
      productExist = new Catalog({
        product: id,
        quantity: parseInt(quantity),
      })

      await productExist.save()
    }

    res
      .status(200)
      .json({ message: 'Object added to the catalog successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error adding to catalog' })
  }
})

//Route for get the quantity available of a product
router.get('/quantity/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await Catalog.find({ product: id })
    const quantity = result[0].quantity
    res.json(quantity)
  } catch (error) {
    return res.status(404).json(error)
  }
})

module.exports = router
