import express, { NextFunction } from 'express'
import fileUpload  from 'express-fileupload'
import {LoadBalancerRegistration, healthCompute} from './loadbalancer'
import {environment} from './environment'
import cors from 'cors'
import mongoose from 'mongoose'
import database from './databaseMongo'
import bodyParser from  'body-parser'
import orderAPI from './routes/order.route'
import productAPI from './routes/product.route'
import userAPI from './routes/user.route'
import roleAPI from './routes/roles.route'
import restaurantAPI from './routes/restaurant.route'
import menuAPI from './routes/menu.route'
import createError from 'http-errors'



const HEALTH_PATH = environment.healthPath
// connect SQL
import sqlConnector from './databaseSql'
sqlConnector.connect()
// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((mongoDB) => {
    console.log("Mongo connected")
    mongoose.connection.db.listCollections().toArray(function (err, names) {
      console.log(names);
    });
  },
  error => {
    console.log("Database could't be connected to: " + error)
    console.log("Using : "+database.db)
  }
)

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'))
app.use(fileUpload());
// API
app.use('/api', orderAPI)
app.use('/api', productAPI)
app.use('/api', userAPI)
app.use('/api', roleAPI)
app.use('/api', restaurantAPI)
app.use('/api', menuAPI)


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
