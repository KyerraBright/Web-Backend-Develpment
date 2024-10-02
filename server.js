const express = require('express');
const app = express();
const env = require("dotenv").config();
const products = require('./js/products');
const path = require('path');
const bodyParser = require('body-parser');
const login = require('./js/login');
const adminview = require('./js/adminview');

app.use('/', products);

app.get('/html/login.html', (reg, res) => {
  res.sendFile(path.join(__dirname, 'html/login.html'));}
  );
app.use("/", login );
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/adminview', (req, res) => {
    const { username, password } = req.body;
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
        res.json({ success: true, role: 'admin' });
    } else if (username === 'user' && password === 'password') {
        res.json({ success: true, role: 'user' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});
app.get('/html/adminview.html', (reg, res) => {
  res.sendFile(path.join(__dirname, 'html/adminview.html'));}
  )

app.use("/", adminview);
app.post('/adminview', (req, res) => {
  const { design, color, size, price } = req.body;
  const sql = 'INSERT INTO users (design, color, size, price) VALUES (?, ?)';
  db.query(sql, [design, color, size, price], (err, result) => {
      if (err) {
          res.status(500).json({ message: 'Database error' });
          throw err;
      }
      res.status(200).json({ message: 'New record created successfully' });
  });
});




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 5500; // Fallback to port 3000 if PORT is not defined
const host = process.env.HOST || 'localhost'; // Fallback to localhost if HOST is not defined



/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});



