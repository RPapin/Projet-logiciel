import express from 'express'
import * as tedious from 'tedious';
import sqlConnector from '../databaseSql'
import path from 'path';
import {generateAccessToken} from '../authJWT';
import redis from 'redis'
import { redisClient } from '../redis.config';
import {authenticateToken} from '../authJWT'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { Buffer } from 'buffer';

const userRoute = express.Router();
const Request = tedious.Request;
const TYPES = tedious.TYPES;
interface RowResult {
    string: string;
  }

userRoute.route('/get-role-by-userId/:id').get((req, res, next) => {
    const request = new Request("SELECT r.role_name FROM Account as a LEFT JOIN Role as r ON a.role_id = r.role_id WHERE a.account_id = "+req.params.id+" ;", (err) => {
        if (err) {
            console.log(err);
        }
    });
    let result = "";
    request.on('row', (columns) => {
        columns.forEach((column) => {
            result+= column.value;
        });
    });
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted",  () => {
        // return the sql result
        res.json(result)
        // sqlConnector.close();
    });
    sqlConnector.execSql(request);
 })
 userRoute.route('/create-user').post((req: any, res, next) => {
    //We need 3 nested sql request so we are using callbacks
    let profilePictureName = 'default-profile-picture.png'
    if (req.files) {
        const myFile = req.files.file;
        const extension = path.extname(myFile.name)
        profilePictureName = 'profile-picture-' + Date.now() + extension
        //  mv() method places the file inside public directory
        myFile.mv(`./public/${profilePictureName}`, (err: any) => {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
        });
    }
    //DEFINE A SPONSORSHIP CODE
    const sponsorship = Date.now()
    const body = JSON.parse(req.body.data)
    // Generate JWT token
    const listToken: string[] = generateAccessToken(body);
    //SEARCH A SPONSOR
    let sponsorshipCredit = 0
    let theSponsorCredit = 0
    let theSponsorId 
    console.log(body)
    if(body.sponsorship_on_sign_up !== ''){
        let result:any = {}
        const sqlSelect = `SELECT * FROM Account WHERE sponsorship = ${body.sponsorship_on_sign_up};`
        const request = new Request(sqlSelect, (err, rowCount) => {
            if (err) {
                res.status(500).send({ msg: "Error occured : " + err });
            } else {
                if(rowCount > 0){
                    sponsorshipCredit = 10
                    theSponsorCredit = result['sponsorship_credit'] + 10
                    theSponsorId = result['account_id'] 
                    const sqlUp = `UPDATE Account SET sponsorship_credit = ${theSponsorCredit} WHERE account_id = ${theSponsorId};`
                    const requestUp = new Request(sqlUp, (err, rowCount) => {
                        if (err) {
                            res.status(500).send({ msg: "Error occured : " + err });
                        } else {
                            insertNewUser(body, sponsorship, profilePictureName, sponsorshipCredit)
                        }
                    })
                    sqlConnector.execSql(requestUp);
                }
            }
        });
        request.on('row', (columns) => {
            columns.forEach((column) => {
                result[column.metadata.colName] = column.value
            });
        });
        sqlConnector.execSql(request);
        //WE FOUND A SPONSOR
        if(sponsorshipCredit !== 0){
            let result:any = {}
 
        }
    }
    
    // INSERT IN THE DATABASE
    const insertNewUser = (body: { role_id: any; phone_number: any; password: any; first_name: any; last_name: any; email: any; }, sponsorship: any, profilePictureName: any, sponsorshipCredit: any) => {
        const sql = `INSERT INTO Account VALUES ( ${body.role_id}, ${body.phone_number}, '${body.password}', '${body.first_name}', '${body.last_name}', ${sponsorship}, '${profilePictureName}', '${body.email}',  ${sponsorshipCredit});`
        console.log(sql)
        const request = new Request(sql, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: "Error occured : " + err });
            } else {
                console.log('New user has been inserted')
                redisClient.set(listToken[0], listToken[1], redis.print);
                res.json({
                    token : listToken[0]
                })
            }
        });
        sqlConnector.execSql(request);
    }
 });
 userRoute.route('/login-user').post((req: any, res, next) => {
     console.log('call to login')
    const body = req.body
    const sql = `SELECT * FROM Account WHERE email = '${body.email}' AND password='${body.password}';`;
    let result:any = {};
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            //User info has been found
            if(rowCount === 1){
                // Generate and save JWT token
                const listToken: string[] = generateAccessToken(body);
                redisClient.set(listToken[0], listToken[1], redis.print);
                result["token"] = listToken[0]
                res.json(result)
            }
            //invalid user logs
            else {

                res.json({
                    error : "Email ou mot de passe incorect"
                })
            }
        }
    });

    request.on('row', (columns) => {
        columns.forEach((column) => {
            result[column.metadata.colName] = column.value
        });
    });
    sqlConnector.execSql(request);
 });
userRoute.route('/check-user').get(authenticateToken, (req: any, res, next) => {
    //FETCH AND SEND USER INFO
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    const decodedToken = jwt.decode(token, {
        complete: true
       });
    const sql = `SELECT * FROM Account WHERE email = '${decodedToken.payload.email}' AND password='${decodedToken.payload.password}';`;
    let result:any = {};
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            //User info has been found
            if(rowCount === 1){
                console.log(result)
                if(result["picture_profil"] !== "default-profile-picture.png"){
                    const bitmap = fs.readFileSync(`./public/${result["picture_profil"]}`);
                    const base64 = Buffer.from(bitmap).toString("base64");
                    result["picture_profil"] = base64
                }
                result["isLoggedIn"] = true
                result["refreshToken"] = req.refreshToken
                res.json(result)
            }
        }
    });
    request.on('row', (columns) => {
        columns.forEach((column) => {
            result[column.metadata.colName] = column.value
        });
    });
    sqlConnector.execSql(request);
})
userRoute.route('/edit-user').post(authenticateToken, (req: any, res, next) => {
    const body = req.body 
    let profilePictureName = 'default-profile-picture.png'
    if (req.files) {
        const myFile = req.files.file;
        const extension = path.extname(myFile.name)
        profilePictureName = 'profile-picture-' + Date.now() + extension
        //  mv() method places the file inside public directory
        myFile.mv(`./public/${profilePictureName}`, (err: any) => {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
        });
    }
    const sql = `UPDATE Account SET phone_number = ${body.phone_number}, password = '${body.password}', first_name = '${body.first_name}', last_name = '${body.last_name}', picture_profil = '${body.picture_profil}', email = '${body.email}' WHERE account_id = '${body.account_id}';`
    let result:any = {};
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            //User info has been found
            if(rowCount === 1){
                result["refreshToken"] = req.refreshToken
                res.json(result)
            }
        }
    });
    request.on('row', (columns) => {
        columns.forEach((column) => {
            result[column.metadata.colName] = column.value
        });
    });
    sqlConnector.execSql(request);
})
userRoute.route('/delete-user').post(authenticateToken, (req: any, res, next) => {
    const body = req.body 
    
    let profilePictureName = 'default-profile-picture.png'
    console.log('./public/' + body.picture_profil)
    if (body.picture_profil !== profilePictureName && fs.lstatSync('./public/' + body.picture_profil).isFile()) {
        try {
            fs.unlinkSync(`./public/${body.picture_profil}`)
            //file removed
          } catch(err) {
            console.error(err)
          }
    }
    const sql = `DELETE FROM Account WHERE account_id = ${body.account_id};`
    console.log(sql)
    let result:any = {};
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ message: "Error occured" });
        } else {
            //User delete has been succeded
            res.json({message : 'user has been deleted'})
        }
    });
    sqlConnector.execSql(request);
})
export default userRoute