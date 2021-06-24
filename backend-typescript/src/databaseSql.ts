import * as tedious from 'tedious';
import {environment} from './environment'

const config = {
    server: 'ordereat-sqlserver.database.windows.net',  // update me
    authentication: {
        type: 'default',
        options: {
            userName: environment.sql.username, // update me
            password: environment.sql.password  // update me
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


