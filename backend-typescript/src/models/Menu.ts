import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: String,
    listArticles: [{ idArticle : String }],
    price: Number,
    image: String,
    description:  String
}, {
  collection: 'menu'
})

export default mongoose.model('Menu', menuSchema)