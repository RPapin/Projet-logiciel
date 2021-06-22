import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
}, {
  collection: 'article'
})

export default mongoose.model('Article', articleSchema)