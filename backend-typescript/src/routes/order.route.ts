import express from 'express'
import { NativeError, Document } from 'mongoose';
import OrderModel from '../models/Order'
import pusher from '../pusher.config'
const orderRoute = express.Router();


orderRoute.route('/get-all-order').get((req, res, next) => {
  console.log('/get-all-order')
    OrderModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
      console.log(data)
       res.json(data)
     }
   })
 })



 orderRoute.route('/create-order').post((req, res, next) => {
  let order_item:any[] = []
  let estimatedTime:number = Date.now()

  req.body.products.forEach((product:any) => {
    order_item.push({
      item_id: product._id,
      quantity: product.quantity
    })
    estimatedTime += (product.estimation_time * 60)
  });
  console.log(req.body.products[0])
   const order = {
    restaurant_id: req.body.products[0].restaurant_id,
    client_id: req.body.account_id,
    order_item: order_item,
    state: 'Recherche de livreur',
    estimation_time: estimatedTime
   }

   
    OrderModel.create(order, (error, data) => {
    if (error) {
      return next(error)
    } else {
      pusher.trigger("order", "new-order", {
        order: data
      });
      res.json(data)
    }
  })
});

orderRoute.route('/get-order-by-id/:id').get((req, res, next) => {
  console.log('et-order-by')
   OrderModel.find({
     client_id : req.params.id
   }, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update order
orderRoute.route('/update-order/:id').post((req, res, next) => {
  OrderModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Order successfully updated!')
    }
  })
})

// Delete order
orderRoute.route('/delete-order/:id').delete((req, res, next) => {
  OrderModel.findByIdAndRemove(req.params.id, undefined, (error: any, data: Document<any, any>) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default orderRoute