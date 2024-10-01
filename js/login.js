const express = require('express');
const router = express.Router();

console.log('Starting the login process');

// Handle login POST request
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy user data
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'customer1', password: 'password123', role: 'customer' }
    ];

    // Check if the user exists
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ success: true, role: user.role });
    } else {
        res.json({ success: false });
    }
});

module.exports = router;
