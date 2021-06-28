import dotEnv from 'dotenv'
import axios from 'axios'
import os from 'os'
import {environment} from './environment'

const port = environment.port;
const HEALTH_PATH = environment.healthPath

// Load balancer registration

export function healthCompute(){
  return os.totalmem()-os.freemem()
}

export function LoadBalancerRegistration (){
  console.log(environment.serverName+' is trying to registered on '+environment.loadBalancer.host+':'+environment.loadBalancer.port)
  try {
      axios.post('/register',
          {serviceName: environment.serverName, servicePort: port, healthPoint: HEALTH_PATH, health: healthCompute()},
          { proxy:
              {
                  host: environment.loadBalancer.host,
                  port: parseInt(environment.loadBalancer.port, 10),
              }
          }
      ).then(response => {
        console.log(environment.serverName+' is registered on '+environment.loadBalancer.host+':'+environment.loadBalancer.port)
      }).catch(error => {
        console.log(error)
      })

  } catch (e) {
      console.log(e)
  }
}
