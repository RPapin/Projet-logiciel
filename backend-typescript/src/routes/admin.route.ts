import express from 'express'
import { NativeError, Document } from 'mongoose';
import {authenticateToken} from '../authJWT'
import AdminModel from '../models/Admin'
import OrderModel from '../models/Order'
import * as tedious from 'tedious';
import sqlConnector from '../databaseSql'
import pusher from '../pusher.config'
const adminRoute = express.Router();

const Request = tedious.Request;
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
adminRoute.route('/get-product-popularity').get(authenticateToken, (req, res, next) => {
  //menu
  let menu:any[] = []
  let article:any[] = []
  let aggregatorOpts = [{
    $match : {"order_item.item_type" : {$eq : "menu"}}
    },{
    $group: {
      _id: "$order_item.item_id",
      count: { $sum: 1 }
    }
  }]
  OrderModel.aggregate(aggregatorOpts).sort({count: 'desc'}).exec((err, result) => {
    if (err) {
      return next(err)
    } else {
      menu = result
    }
  })
  //article
  aggregatorOpts = [{
    $match : {"order_item.item_type" : {$eq : "article"}}
    },{
    $group: {
      _id: "$order_item.item_id",
      count: { $sum: 1 }
    }
  }]
  OrderModel.aggregate(aggregatorOpts).sort({count: 'desc'}).exec((err, result) => {
    if (err) {
      return next(err)
    } else {
      article = result
      res.json({
        menu,
        article
      })
    }
  })
})
// adminRoute.route('/get-client-account').get(authenticateToken, (req, res, next) => {
//   const sql = `SELECT * FROM Account WHERE role_id = 3;`;
//   let result:any = {};
//   const request = new Request(sql, (err, rowCount) => {
//       if (err) {
//           console.error(err.message);
//       } else {
//         //User info has been found
//         console.log(result)
//         res.json(result)
//       }
//   });

//   request.on('row', (columns) => {
//       columns.forEach((column) => {
//           result[column.metadata.colName] = column.value
//       });
//   });
//   sqlConnector.execSql(request);
// })

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



adminRoute.route('/create-server-usage-log').post((req, res, next) => {
  let date:number = Date.now()

  const admin = {
    type: "server",
    value: req.body.usedMemory,
    date: date
  }

  AdminModel.create(admin, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

adminRoute.route('/get-server-usage-log').get(authenticateToken, (req, res, next) => {
  AdminModel.find({type: 'server'}).sort({date: 'desc'}).limit(24).exec( (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({
        data
      })
    }
  })
});

export default adminRoute