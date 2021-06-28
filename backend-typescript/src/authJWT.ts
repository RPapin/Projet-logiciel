import jwt from 'jsonwebtoken'
import { redisClient } from './redis.config';
import redis from 'redis'

export function generateAccessToken(userInfo: object, fromRefreshToken: boolean = false): string[] {
  let tokenRefresh:string = ""
  const token:string = jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
  if(!fromRefreshToken)tokenRefresh = jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
  return [token, tokenRefresh]
}

export function authenticateToken(req: any, res: any, next: any): void {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.json({error : 'No token provided'})

    jwt.verify(token, process.env.TOKEN_SECRET as string, async (err: any, user: any) => {
      if (err){
        console.log(err)
        err = err.toString()
        // if token expired
        if(err.includes("expired")){
          await redisClient.get(token, async (err, reply) => {
            let refreshToken = reply
            // if a refresh token exist
            if(refreshToken !== null){
              await redisClient.del(token)
              req.refreshToken = refreshToken
              req.user = user
              console.log("refreshToken is now on use")
              next()
            } else return res.json({error : 'Refresh Token expired'})
          })
        } else {
          return res.json({error : 'Bad token provided'})
        }
      } else {
        req.user = user
        next()
      }
    })
  }
