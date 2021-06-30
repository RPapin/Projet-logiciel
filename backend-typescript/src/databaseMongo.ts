import {environment} from './environment'

export default {
   db: 'mongodb://'+environment.mongodbHost+':27017/ordereat'
}