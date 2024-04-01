const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      productid: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  cost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Processing',
  },
})

module.exports = mongoose.model('Order', orderSchema)
