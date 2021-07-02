import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  type: String,
  value: String,
  date: Number,
}, {
  collection: 'adminInfo'
})

export default mongoose.model('AdminInfo', adminSchema)