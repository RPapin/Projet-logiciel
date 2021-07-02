import express from 'express'
import { NativeError, Document } from 'mongoose';
import OrderModel from '../models/Order'
import {authenticateToken} from '../authJWT'
import pusher from '../pusher.config'
const orderRoute = express.Router();


/**
 * @api {get} /get-all-order Return all orders
 * @apiName Order
 * @apiGroup Order
 * * 
 * @apiSuccess {Array} Return all orders.
 */
orderRoute.route('/get-all-order').get(authenticateToken, (req, res, next) => {
  console.log('/get-all-order')
    OrderModel.find().sort({estimation_time: 'desc'}).exec( (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });

/**
 * @api {post} /create-order Create a new order in database
 * @apiName Order
 * @apiGroup Order
 *
 * @apiParam {Object} Order object to be created.
 * 
 * @apiSuccess {Object} The newly created order.
 */
 orderRoute.route('/create-order').post(authenticateToken, (req, res, next) => {
  let order_item:any[] = []
  let estimatedTime:number = Date.now()

  req.body.products.forEach((product:any) => {
    order_item.push({
      item_id: product._id,
      item_name: product.name,
      quantity: product.quantity
    })

    estimatedTime += (product.estimation_time * product.quantity * 60000)
  });
  console.log(req.body.products[0])
  //req.body.products[0].restaurant_id,
   const order = {
    restaurant_id: "81",
    client_id: req.body.account_id,
    livreur_id: "",
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

/**
 * @api {get} /get-order-by-id/:id Return a specific order
 * @apiName Order
 * @apiGroup Order
 *
 * @apiParam {Object} id The id of the specific order.
 * 
 * @apiSuccess {Object} The specific order.
 */
orderRoute.route('/get-order-by-id/:id').get(authenticateToken, (req, res, next) => {
  console.log('get-order-by')
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

/**
 * @api {post} /update-order/:id Update a specific order
 * @apiName Order
 * @apiGroup Order
 *
 * @apiParam {Object} id The id of the specific order.
 * 
 * @apiSuccess {Object} The specific order.
 */
orderRoute.route('/update-order/:id').post(authenticateToken, (req, res, next) => {
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


/**
 * @api {delete} /delete-order/:id Delete a specific order
 * @apiName Order
 * @apiGroup Order
 *
 * @apiParam {Object} id The id of the specific order.
 * 
 * @apiSuccess {Object} Success message.
 */
orderRoute.route('/delete-order/:id').delete(authenticateToken, (req, res, next) => {
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