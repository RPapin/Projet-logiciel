import express from 'express'
import { NativeError, Document } from 'mongoose';
import ArticleModel from '../models/Article'
import {authenticateToken} from '../authJWT'
const articleRoute = express.Router();


articleRoute.route('/get-all-article').get(authenticateToken, (req: any, res, next) => {
    
    ArticleModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json({
          articles : data,
          refreshToken : req.refreshToken
        })
      }
    })
 })



 articleRoute.route('/create-article').post((req, res, next) => {
    ArticleModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

articleRoute.route('/get-article/:id').get((req, res, next) => {
   ArticleModel.findById(req.params.id, (error: NativeError, data: Document<any, any>) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update article
articleRoute.route('/update-article/:id').post((req, res, next) => {
  ArticleModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Article successfully updated!')
    }
  })
})

// Delete article
articleRoute.route('/delete-article/:id').delete((req, res, next) => {
  ArticleModel.findByIdAndRemove(req.params.id, undefined, (error: any, data: Document<any, any>) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

export default articleRoute