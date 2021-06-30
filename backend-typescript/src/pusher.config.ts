import Pusher from 'pusher'
import {environment} from './environment'
const pusher = new Pusher({
    appId: "1227031",
    key: "cddd1716e23bf4a29c62",
    secret: environment.pusher_secret,
    cluster: "eu",
    useTLS: true
  });
export default pusher