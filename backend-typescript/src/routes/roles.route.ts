import express from 'express'
import * as tedious from 'tedious';
import sqlConnector from '../databaseSql'
const Request = tedious.Request;
const roleRoute = express.Router();


roleRoute.route('/get-roles').get((req: any, res, next) => {
    const sql = `SELECT * FROM role;`;
    let result:any = [];
    let i = 0
    const request = new Request(sql, (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            //User info has been found
            res.json(result)
        }
    });
    request.on('row', (columns) => {
        let resultLocal:any = {}
        columns.forEach((column) => {
            resultLocal[column.metadata.colName] = column.value
        });
        result.push(resultLocal)
    });
    sqlConnector.execSql(request);
 })
export default roleRoute