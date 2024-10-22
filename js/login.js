const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing

console.log('Starting the login process');

// Middleware to parse JSON
router.use(bodyParser.json());

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
  user: 'KyerraBright',
  password: 'March12001',
  database: 'Malea'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database!!!');

});

// Handle login POST request
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    // Query the database for the user
    const query = 'SELECT * FROM login WHERE username = ?';
    db.query(query, [username], (error, results) => {
        console.log("in the db query", results);
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        const user = results[0];
        console.log(user);

        // Directly compare passwords (not recommended for production)
        if (user.password === password) {
            // Login successful, send user role
            return res.json({ success: true, role: user.role });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
    });

    });

module.exports = router;
