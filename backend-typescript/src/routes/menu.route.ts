import express from 'express'
import { NativeError, Document } from 'mongoose';
import MenuModel from '../models/Menu'
import RestaurantModel from '../models/Restaurant'
import {authenticateToken} from '../authJWT'
const menuRoute = express.Router();


/**
 * @api {get} /menus Return all menus
 * @apiName Menus
 * @apiGroup Menu
 *
 * @apiSuccess {Array} All menus.
 */
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

/**
 * @api {post} /menu Create a new menu in database
 * @apiName Menu
 * @apiGroup Menu
 *
 * @apiParam {Object} Menu object to be created.
 * @apiParam {Number} manager_id Id of the current manager.
 * 
 * @apiSuccess {Object} The newly created menu.
 */
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

/**
 * @api {get} /menu/:id Return a specific menu
 * @apiName Menu
 * @apiGroup Menu
 *
 * @apiParam {Number} id The id of the menu to retrieve.
 * 
 * @apiSuccess {Object} The corresponding menu.
 */
menuRoute.route('/menu/:id').get((req, res, next) => {
   MenuModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


/**
 * @api {post} /menu/update/:id Update a menu
 * @apiName Menu
 * @apiGroup Menu
 *
 * @apiParam {Number} id The id of the menu to update.
 * @apiParam {Object} menu The new object that replace the old one.
 * 
 * @apiSuccess {Object} The updated menu.
 */
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

/**
 * @api {delete} /menu/:id Delete a menu
 * @apiName Menu
 * @apiGroup Menu
 *
 * @apiParam {Number} id The id of the menu to update.
 * 
 * @apiSuccess {String} Success message.
 */
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