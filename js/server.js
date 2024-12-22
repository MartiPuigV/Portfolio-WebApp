const { Pool } = require('pg');
require('dotenv').config({path: __dirname + '/../.env'});

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to the database');
    }
});

export async function _query(text) {
    return await pool.query(text);
}
