const express = require('express');
const orderRoute = express.Router();

// Order model
let OrderModel = require('../models/Order');

orderRoute.route('/').get((req, res) => {
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

orderRoute.route('/edit-order/:id').get((req, res) => {
   OrderModel.findById(req.params.id, (error, data) => {
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
  OrderModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = orderRoute;