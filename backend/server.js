const express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Create a connection to the database file (e.g., "mydatabase.db")
const db = new sqlite3.Database('mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the database');
        // Create table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT
            )
        `);
    }
});

// Store name in the database
app.post('/api/storeName', (req, res) => {
    const name = req.body.name;
    const query = 'INSERT INTO users (name) VALUES (?)';
    db.run(query, [name], (err) => {
        if (err) {
            console.error('Error storing name', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Name stored successfully' });
        }
    });
});

// Retrieve the latest stored name from the database
app.get('/api/retrieveName', (req, res) => {
    const query = 'SELECT name FROM users ORDER BY id DESC LIMIT 1';
    db.get(query, (err, row) => {
        if (err) {
            console.error('Error retrieving name', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (row) {
                res.json({ name: row.name });
            } else {
                res.json({ name: 'Name not found' });
            }
        }
    });
});

// ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
