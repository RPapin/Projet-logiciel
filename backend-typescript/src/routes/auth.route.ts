import express from 'express'
import * as tedious from 'tedious';
import sqlConnector from '../databaseSql'
import path from 'path';

const userRoute = express.Router();
const Request = tedious.Request;

 userRoute.route('/create-user').post((req: any, res, next) => {

    // INSERT IN THE DATABASE
    // const sql = `INSERT INTO Account VALUES ( null, ${body.phone}, '${body.password}', '${body.firstName}', '${body.name}', ${body.sponsorship}, '${profilePictureName}', '${body.email}', null, null)`
    // console.log(sql)
    // const request = new Request(sql, function(err) {
    // if (err) {
    //     console.log(err);}
    // });
    // request.on('done', function(rowCount, more) {
    //     res.json(rowCount)
    // });

    // sqlConnector.execSql(request);
 })

export default userRoute