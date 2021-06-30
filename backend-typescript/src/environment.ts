import dotEnv from 'dotenv'

dotEnv.config()

export let environment = {
	healthPath: process.env.HEALTH_PATH,
	port: process.env.PORT || 4000,
    sql: {
        username: process.env.SQL_USERNAME,
        password: process.env.SQL_PWD
    },
    mongodb: {
        host: process.env.MONGODB_HOST || "localhost",
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PWD
    },
    serverName: process.env.SERVER_NAME,
    loadBalancer: {
    	host: process.env.LOAD_BALANCER_HOST,
    	port: process.env.LOAD_BALANCER_PORT
    },
    redisHost: process.env.REDIS_HOST || "localhost",
    pusher_secret: process.env.PUSHER_SECRET
}