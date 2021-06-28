import express, { NextFunction } from 'express'
import fileUpload  from 'express-fileupload'
import {LoadBalancerRegistration, healthCompute} from './loadbalancer'
import {environment} from './environment'
import cors from 'cors'
import mongoose from 'mongoose'
import database from './databaseMongo'
import bodyParser from  'body-parser'
import orderAPI from './routes/order.route'
import articleAPI from './routes/article.route'
import userAPI from './routes/user.route'
import roleAPI from './routes/roles.route'
import createError from 'http-errors'


const HEALTH_PATH = environment.healthPath
// connect SQL
import sqlConnector from './databaseSql'
sqlConnector.connect()
// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connected")
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
app.use('/api', articleAPI)
app.use('/api', userAPI)
app.use('/api', roleAPI)


// Health route for load balancing
app.get(HEALTH_PATH, (req, res) => {
  res.status(200).json({health: healthCompute()})
})

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
  console.error("[ERROR]"+err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

LoadBalancerRegistration()
