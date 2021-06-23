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
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import os from 'os'

const UUID = uuidv4()
const SERVER_NAME = "Backend_" + UUID
const HEALTH_PATH = '/health'

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
//AUTH


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
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// Load balancer registration

function healthCompute(){
  return os.freemem()/os.totalmem()
}

function LoadBalancerRegistration (){
  console.log(process.env.SERVER_NAME+' is trying to registered on '+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT)
  try {
      axios.post('/register',
          {serviceName: process.env.SERVER_NAME, servicePort: port, healthPoint: HEALTH_PATH, health: healthCompute()},
          { proxy:
              {
                  host: process.env.LOAD_BALANCER_HOST,
                  port: parseInt(process.env.LOAD_BALANCER_PORT, 10),
              }
          }
      ).then(response => {
        console.log(process.env.SERVER_NAME+' is registered on '+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT)
      }).catch(error => {
        console.log(error)
      })

  } catch (e) {
      console.log(e)
  }
}

LoadBalancerRegistration()