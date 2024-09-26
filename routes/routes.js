const express = require('express');
const router = express.Router();
const path = require('path');


// Serve the static HTML file
router.get('/', (req, res) => {
    console.log("Serving index.html");
    res.sendFile(path.join(__dirname, '../index.html')); // Adjust the path as needed
});

// Example of another route
router.get('../html/login', (req, res) => {
    res.send("login Page");
});

// Export the router
module.exports = router;
