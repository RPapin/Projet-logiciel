import express from 'express'
import { NativeError, Document } from 'mongoose';
import MenuModel from '../models/Menu'
import RestaurantModel from '../models/Restaurant'
import {authenticateToken} from '../authJWT'
const menuRoute = express.Router();


menuRoute.route('/menus').get(authenticateToken, (req, res, next) => {
  MenuModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({
        menus : data
      })
    }
  })
})

menuRoute.route('/menu').post((req, res, next) => {
   RestaurantModel.findOne({
     manager_id : req.body.manager_id.toString()
   }, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      req.body.restaurant_id = data._id
      MenuModel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }
  })
})

menuRoute.route('/menu/:id').get((req, res, next) => {
   MenuModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

menuRoute.route('/menu/update/:id').post((req, res, next) => {
  MenuModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Menu successfully updated!')
    }
  })
})

menuRoute.route('/menu/:id').delete((req, res, next) => {
  MenuModel.findByIdAndRemove(req.params.id, undefined, (error: any, data: Document<any, any>) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default menuRoute