import {environment} from './environment'

export default {
   db: 'mongodb://'+encodeURIComponent(environment.mongodb.username)+':'+encodeURIComponent(environment.mongodb.password)+'@'+environment.mongodb.host+':27017/OrderEATMDB'
}