import express, { NextFunction } from 'express'
import fileUpload  from 'express-fileupload'

import cors from 'cors'
import mongoose from 'mongoose'
import dotEnv from 'dotenv'
import database from './databaseMongo'
import bodyParser from  'body-parser'
import orderAPI from './routes/order.route'
import userAPI from './routes/user.route'
import createError from 'http-errors'

dotEnv.config()
// connect SQL
import sqlConnector from './databaseSql'
sqlConnector.connect()
// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'))
app.use(cors());
app.use(fileUpload());
// API
app.use('/api', orderAPI)
app.use('/api', userAPI)

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req: any, res: any, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use( (err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});