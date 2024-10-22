const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'KyerraBright',
  password: 'March12001',
  database: 'Malea'
});

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Serve the static HTML file
router.get('/', (req, res) => {
  console.log("Serving index.html");
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Create a new route to add data to the database
router.post('/additem', (req, res) => {
  console.log("Adding new data");
  console.log("Request body: ", req.body); // Log the incoming request body

  const { design, color, size, price, image } = req.body; // Extract data from the request body

  // Validate input
 // if (!design || !color || !size || !price || !image) {
    //return res.status(400).json({ message: 'All fields are required' });
  //}

  const query = 'INSERT INTO yourtable (Design, Color, Size, Price, Image) VALUES (?, ?, ?, ?, ?)';
  const imageBuffer = Buffer.from(image, 'base64'); // Convert Base64 string to buffer

  connection.query(query, [design, color, size, price, imageBuffer], (error, results) => {
    if (error) {
      console.error('Error in the insert query: ', error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }

    res.status(201).json({ message: 'Data added successfully', id: results.insertId });
  });
});

router.delete('/delete', (req, res) => {
  const { design } = req.body;

  if (!design) {
      return res.status(400).json({ message: 'Design name is required' });
  }

  const query = 'DELETE FROM yourtable WHERE Design = ?'; // Update to your actual table name

  connection.query(query, [design], (error, results) => {
      if (error) {
          console.error('Error in the delete query: ', error);
          return res.status(500).json({ message: 'Server error', error: error.message });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Design not found' });
      }

      res.status(200).json({ message: 'Design deleted successfully' });
  });
});


// Export the router
module.exports = router;
