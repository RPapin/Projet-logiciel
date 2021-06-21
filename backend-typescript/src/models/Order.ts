import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const orderSchema = new Schema({
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

export default mongoose.model('Order', orderSchema)