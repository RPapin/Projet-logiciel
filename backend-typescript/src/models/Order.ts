import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  restaurant_id: {
    type: Schema.Types.ObjectId
  },
  client_id: {
    type: String
  },
  livreur_id: {
    type: String
  },
  order_item: {
    type: [{item_id:String, item_name:String, item_type:String, quantity:Number}]
  },
  state : {
    type: String
  },
  estimation_time: {
    type: Number
  }
}, {
  collection: 'order'
})

export default mongoose.model('Order', orderSchema)