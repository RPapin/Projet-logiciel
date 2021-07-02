import express from 'express'
import { NativeError, Document } from 'mongoose';
import ProductModel from '../models/Product'
import RestaurantModel from '../models/Restaurant'
import {authenticateToken} from '../authJWT'
const productRoute = express.Router();

/**
 * @api {get} /get-all-product Return all products
 * @apiName Product
 * @apiGroup Product
 * * 
 * @apiSuccess {Array} Return all products.
 */
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

/**
 * @api {post} /create-product Create a new product in database
 * @apiName Product
 * @apiGroup Product
 *
 * @apiParam {Object} Product object to be created.
 * 
 * @apiSuccess {Object} The newly created product.
 */
productRoute.route('/create-product').post((req, res, next) => {
   RestaurantModel.findOne({
     manager_id : req.body.manager_id.toString()
   }, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      req.body.restaurant_id = data._id
      ProductModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }
  })
});

/**
 * @api {get} /get-product/:id Return a specific product
 * @apiName Product
 * @apiGroup Product
 *
 * @apiParam {Object} id The id of the specific product.
 * 
 * @apiSuccess {Object} The specific product.
 */
productRoute.route('/get-product/:id').get((req, res, next) => {
   ProductModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

/**
 * @api {post} /update-product/:id Update a specific product
 * @apiName Product
 * @apiGroup Product
 *
 * @apiParam {Object} id The id of the specific product.
 * 
 * @apiSuccess {Object} The specific product.
 */
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

/**
 * @api {delete} /delete-product/:id Delete a specific product
 * @apiName Product
 * @apiGroup Product
 *
 * @apiParam {Object} id The id of the specific product.
 * 
 * @apiSuccess {Object} Success message.
 */
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