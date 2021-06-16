const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
}, {
  collection: 'order'
})

module.exports = mongoose.model('Order', orderSchema)