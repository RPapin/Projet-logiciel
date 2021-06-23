import express from 'express'
import { NativeError, Document } from 'mongoose';
import OrderModel from '../models/Order'
const orderRoute = express.Router();


orderRoute.route('/get-all-order').get((req, res, next) => {
    OrderModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })



 orderRoute.route('/create-order').post((req, res, next) => {
    OrderModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

orderRoute.route('/get-order/:id').get((req, res, next) => {
   OrderModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
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