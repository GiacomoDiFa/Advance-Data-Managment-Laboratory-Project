const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
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
})

module.exports = mongoose.model('Cart', cartSchema)
