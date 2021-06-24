import * as tedious from 'tedious';
import dotEnv from 'dotenv'
dotEnv.config()
const config = {
    server: 'ordereat-sqlserver.database.windows.net',  // update me
    authentication: {
        type: 'default',
        options: {
            userName: process.env.SQL_USERNAME, // update me
            password: process.env.SQL_PWD  // update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'OrderEAT-SQL',
        port: 1433
    }
};
const connection = new tedious.Connection(config);
connection.on('connect', (err: Error) => {
    if(err) console.log("Error while sql connection " + err);
    // If no error, then good to proceed.
    else console.log("SQL Connected");
});
export default connection


