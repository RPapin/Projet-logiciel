import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const adminSchema = new Schema({
type: {
    type: String
  },
  value: {
    type: String
  },
  date: {
    type: Number
  },
}, {
  collection: 'adminInfo'
})

export default mongoose.model('AdminInfo', adminSchema)