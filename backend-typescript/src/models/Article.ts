import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  decription: {
    type: String
  },
}, {
  collection: 'article'
})

export default mongoose.model('Article', articleSchema)