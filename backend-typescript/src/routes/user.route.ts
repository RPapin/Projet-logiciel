import express from 'express'
import * as tedious from 'tedious';
import sqlConnector from '../databaseSql'
import path from 'path';
import {generateAccessToken} from '../authJWT';
import redis from 'redis'
import { redisClient } from '../redis.config';

const userRoute = express.Router();
const Request = tedious.Request;
const TYPES = tedious.TYPES;
interface RowResult {
    string: string;
  }

userRoute.route('/get-role-by-userId/:id').get((req, res, next) => {
    const request = new Request("SELECT r.role_name FROM Account as a LEFT JOIN Role as r ON a.role_id = r.role_id WHERE a.account_id = "+req.params.id+" ;", (err) => {
    if (err) {
        console.log(err);}
    });
    let result = "";
    request.on('row', (columns) => {
        columns.forEach((column) => {
            if (column.value === null) {
            console.log('NULL');
            } else {
            result+= column.value;
            }
        });
    });

    request.on('done', (rowCount, more) => {
    console.log(rowCount + ' rows returned');
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
            // returing the response with file path and name
            return res.send({name: myFile.name, path: `/${myFile.name}`});
        });
    }
    const body = JSON.parse(req.body.data)
    body.sponsorship = body.sponsorship === "" ? null : '"' + body.sponsorship + '"'
    // Generate JWT token
    const listToken: string[] = generateAccessToken(body);
    // INSERT IN THE DATABASE
    const sql = `INSERT INTO Account VALUES ( null, ${body.phone}, '${body.password}', '${body.firstName}', '${body.name}', ${body.sponsorship}, '${profilePictureName}', '${body.email}', null, null)`// '${token}'
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

 });
 userRoute.route('/login-user').post((req: any, res, next) => {
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
        console.log(result)
    });
    sqlConnector.execSql(request);
 });

export default userRoute