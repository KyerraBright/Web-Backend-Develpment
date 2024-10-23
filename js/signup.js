const express = require('express');
const router = express.Router();
const mysql = require('mysql');
console.log("in the signup.js file")
// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'KyerraBright',
  password: 'March12001',
  database: 'Malea'
});

// Middleware to parse JSON bodies
router.use(express.json());

// POST route to add user
// POST route to add user
router.post('/addUser', (req, res) => {
    const { customer, password } = req.body; // customer should represent the username

    if (!customer || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    const query = 'INSERT INTO login (role, username, password) VALUES (?, ?, ?)';
    const role = 'customer'; // Default role

    // Correct order of parameters
    connection.query(query, [role, customer, password], (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({ message: 'Failed to add user' });
        }
        console.log('User added:', results); // Log results to the terminal
        res.status(201).json({ message: 'User added successfully' });
    });
});


module.exports = router; // Export the router
