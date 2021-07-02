import express from 'express'
import { NativeError, Document } from 'mongoose';
import RestaurantModel from '../models/Restaurant'
import {authenticateToken} from '../authJWT'
const restaurantRoute = express.Router();

/**
 * @api {get} /restaurants Return all restaurants
 * @apiName Restaurant
 * @apiGroup Restaurant
 * * 
 * @apiSuccess {Array} Return all restaurants.
 */
restaurantRoute.route('/restaurants').get(authenticateToken, (req, res, next) => {
  RestaurantModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({
        restaurants : data
      })
    }
  })
})

/**
 * @api {post} /restaurant Create a new restaurant in database
 * @apiName Restaurant
 * @apiGroup Restaurant
 *
 * @apiParam {Object} restaurant object to be created.
 * 
 * @apiSuccess {Object} The newly created restaurant.
 */
restaurantRoute.route('/restaurant').post((req, res, next) => {
  RestaurantModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

/**
 * @api {get} /restaurant/:id Return a specific restaurant
 * @apiName Restaurant
 * @apiGroup Restaurant
 *
 * @apiParam {Object} id The id of the specific restaurant.
 * 
 * @apiSuccess {Object} The specific restaurant.
 */
restaurantRoute.route('/restaurant/:id').get((req, res, next) => {
   RestaurantModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

/**
 * @api {post} /restaurant/update/:id Update a specific restaurant
 * @apiName Restaurant
 * @apiGroup Restaurant
 *
 * @apiParam {Object} id The id of the specific restaurant.
 * 
 * @apiSuccess {Object} The specific restaurant.
 */
restaurantRoute.route('/restaurant/update/:id').post((req, res, next) => {
  RestaurantModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Restaurant successfully updated!')
    }
  })
})

/**
 * @api {delete} /restaurant/:id Delete a specific restaurant
 * @apiName Restaurant
 * @apiGroup Restaurant
 *
 * @apiParam {Object} id The id of the specific restaurant.
 * 
 * @apiSuccess {Object} Success message.
 */
restaurantRoute.route('/restaurant/:id').delete((req, res, next) => {
  RestaurantModel.findByIdAndRemove(req.params.id, undefined, (error: any, data: Document<any, any>) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default restaurantRoute