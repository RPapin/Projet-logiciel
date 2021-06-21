import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: String,
    listArticles: [{ idArticle : String }],
    price: Number
}, {
  collection: 'menu'
})

export default mongoose.model('Menu', menuSchema)