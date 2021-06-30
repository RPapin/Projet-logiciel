import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restaurant_id: Schema.Types.ObjectId,
    name: String,
    listArticles: [{ idArticle : String }],
    price: Number,
    image: String,
    description:  String
}, {
  collection: 'menu'
})

export default mongoose.model('Menu', menuSchema)