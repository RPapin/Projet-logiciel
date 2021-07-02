import {environment} from './environment'
//'mongodb://'+encodeURIComponent(environment.mongodb.username)+':'+encodeURIComponent(environment.mongodb.password)+'@'+environment.mongodb.host+':27017/OrderEATMDB'
export default {
   db: 'mongodb://'+environment.mongodb.host+':27017/ordereat'
}