import express from 'express'
import { NativeError, Document } from 'mongoose';
import ProductModel from '../models/Product'
import {authenticateToken} from '../authJWT'
const productRoute = express.Router();


productRoute.route('/get-all-product').get(authenticateToken, (req: any, res, next) => {
    ProductModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          products : data
        })
      }
    })
 })



 productRoute.route('/create-product').post((req, res, next) => {
    ProductModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

productRoute.route('/get-product/:id').get((req, res, next) => {
   ProductModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update product
productRoute.route('/update-product/:id').post((req, res, next) => {
  ProductModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Product successfully updated!')
    }
  })
})

// Delete product
productRoute.route('/delete-product/:id').delete((req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.id, undefined, (error: any, data: Document<any, any>) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default productRoute