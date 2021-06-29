import {environment} from './environment'

export default {
   db: 'mongodb://'+environment.redisHost+':27017/OrderEATMDB'
}