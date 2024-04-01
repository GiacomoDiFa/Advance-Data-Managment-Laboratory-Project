const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    street: { type: String, required: true },
    money: { type: Number, default: 1000 },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
)

const userModel = mongoose.model('User', userSchema)
module.exports = userModel
