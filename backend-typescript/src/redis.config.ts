import redis from 'redis'

const redisClient = redis.createClient(6379);
redisClient.on('error', (err) => {
    console.log('Error occured while connecting or accessing redis server');
});

export {redisClient}