import mongoose from 'mongoose'
const Schema = mongoose.Schema;
//description: String,
const productSchema = new Schema({
  restaurant_id: String,
  type: String,
  name: String,
  price: Number,
  picture: String,
  estimation_time: Number
}, {
  collection: 'product'
})

export default mongoose.model('product', productSchema)