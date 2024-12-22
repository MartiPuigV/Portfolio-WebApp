const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
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

async function _query(text) {
    return await pool.query(text);
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/v1/query', async (req, res) => {
    const { query, API_key } = req.body;
    if (API_key !== process.env.API_KEY) {
        res.status(401).json({error: 'Unauthorized'});
        return;
    }
    try {
        const result = await _query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
