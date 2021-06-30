import {environment} from './environment'

export default {
   db: 'mongodb://'+environment.mongodb.host+':27017/ordereat'
}