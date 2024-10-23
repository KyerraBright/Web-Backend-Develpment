const express = require('express');
const app = express();
const env = require("dotenv").config();
const products = require('./js/products');
const path = require('path');
const bodyParser = require('body-parser');
const login = require('./js/login');
const adminview = require('./js/adminview');
const signup = require('./js/signup');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON
app.use(express.static(path.join(__dirname, 'html')));

// Routes
app.use('/', products);
app.use("/", login);
app.use("/", adminview);
app.use("/", signup);

// Serve HTML files
app.get('/html/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/about.html'));
});
app.get('/html/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/signup.html'));
});
app.get('/html/inventory.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/inventory.html'));
});
app.get('/html/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/login.html'));
});
app.get('/html/adminview.html', (req, res) => {
  console.log('adminview was called');
  res.sendFile(path.join(__dirname, 'html/adminview.html'));
});

// DELETE route
app.delete('/delete', (req, res) => {
  const { design } = req.body;

  if (!design) {
      return res.status(400).json({ message: 'Design name is required' });
  }

  const query = 'DELETE FROM yourtable WHERE Design = ?';

  connection.query(query, [design], (error, results) => {
      if (error) {
          console.error('Error in delete query:', error);
          return res.status(500).json({ message: 'Server error' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Design not found' });
      }

      res.status(200).json({ message: 'Design deleted successfully' });
  });
});

// Local Server Information
const port = process.env.PORT || 5500;
const host = process.env.HOST || 'localhost';

// Log statement to confirm server operation
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
