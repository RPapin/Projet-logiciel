import dotEnv from 'dotenv'
import axios from 'axios'
import os from 'os'

const port = process.env.PORT || 4000;
const HEALTH_PATH = process.env.HEALTH_PATH

// Load balancer registration

// export function healthCompute(){
//   return os.freemem()/os.totalmem()
// }

// export function LoadBalancerRegistration (){
//   console.log(process.env.SERVER_NAME+' is trying to registered on '+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT)
//   try {
//       axios.post('/register',
//           {serviceName: process.env.SERVER_NAME, servicePort: port, healthPoint: HEALTH_PATH, health: healthCompute()},
//           { proxy:
//               {
//                   host: process.env.LOAD_BALANCER_HOST,
//                   port: parseInt(process.env.LOAD_BALANCER_PORT, 10),
//               }
//           }
//       ).then(response => {
//         console.log(process.env.SERVER_NAME+' is registered on '+process.env.LOAD_BALANCER_HOST+':'+process.env.LOAD_BALANCER_PORT)
//       }).catch(error => {
//         console.log(error)
//       })

//   } catch (e) {
//       console.log(e)
//   }
// }