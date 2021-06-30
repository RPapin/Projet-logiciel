import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  manager_id: Number,
  address: String,
  name: String,
  description: String,
  tags: String,
  picture: String
}, {
  collection: 'restaurant'
})

export default mongoose.model('Restaurant', restaurantSchema)