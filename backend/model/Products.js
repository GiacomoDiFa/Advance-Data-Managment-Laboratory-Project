const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamp: true,
  }
)

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel
