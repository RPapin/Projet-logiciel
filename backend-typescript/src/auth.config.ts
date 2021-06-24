import dotEnv from 'dotenv'

dotEnv.config()

export const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH_SECRET,
    baseURL: 'http://localhost:4000',
    clientID: 'dUPYacVwYWAM3iklwisNvcWrgjsPA2sX',
    issuerBaseURL: 'https://ordereat.eu.auth0.com'
  };