import express from 'express'
import { NativeError, Document } from 'mongoose';
import {authenticateToken} from '../authJWT'
import AdminModel from '../models/Admin'
import pusher from '../pusher.config'
const adminRoute = express.Router();


adminRoute.route('/get-connexion-log').get(authenticateToken, (req, res, next) => {
  console.log('/get-all-admin')
  let totalLog = 0
  AdminModel.countDocuments({type: 'log'}).exec( (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      totalLog = data
    }
  })
    AdminModel.find({type: 'log'}).sort({date: 'desc'}).limit(20).exec( (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          data,
          totalLog : totalLog
        })
      }
    })
  });

 adminRoute.route('/create-connexion-log').post((req, res, next) => {
  let date:number = Date.now()
  console.log(req.body)
  //req.body.products[0].restaurant_id,
   const admin = {
    type: "log",
    value: req.body.action,
    date: date
   }
   
    AdminModel.create(admin, (error, data) => {
    if (error) {
      return next(error)
    } else {
    //   pusher.trigger("admin", "new-admin", {
    //     admin: data
    //   });
      res.json(data)
    }
  })
});

adminRoute.route('/get-admin-by-id/:id').get((req, res, next) => {
  console.log('et-admin-by')
   AdminModel.find({
     client_id : req.params.id
   }, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update admin
adminRoute.route('/update-admin/:id').post((req, res, next) => {
  AdminModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Admin successfully updated!')
    }
  })
})

// Delete admin
adminRoute.route('/delete-admin/:id').get((req, res, next) => {
  AdminModel.findByIdAndRemove(req.params.id, undefined, (error: any, data: Document<any, any>) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default adminRoute