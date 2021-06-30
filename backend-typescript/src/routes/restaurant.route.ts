import express from 'express'
import { NativeError, Document } from 'mongoose';
import RestaurantModel from '../models/Restaurant'
import {authenticateToken} from '../authJWT'
const restaurantRoute = express.Router();


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

restaurantRoute.route('/restaurant').post((req, res, next) => {
  RestaurantModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

restaurantRoute.route('/restaurant/:id').get((req, res, next) => {
   RestaurantModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

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