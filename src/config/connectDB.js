import mysql from 'mysql2';
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_database',
    password: ''
});
const connection = pool.promise();
export default connection;