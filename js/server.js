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

async function _query(text) {
    return await pool.query(text);
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/v1/query', async (req, res) => { // @fixme Consider refactoring this to use
    const { query, API_key } = req.body;        // a middleware for API key validation
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

app.get('/', async (req, res) => {
    res.send('Alive!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
