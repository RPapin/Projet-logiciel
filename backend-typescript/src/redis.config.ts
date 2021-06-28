import redis from 'redis'
import {environment} from './environment'

const redisClient = redis.createClient(6379, environment.redisHost);
redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
});

export {redisClient}