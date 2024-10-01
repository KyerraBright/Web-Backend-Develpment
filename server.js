const express = require('express');
const app = express();
const env = require("dotenv").config();
const products = require('./js/products');
const path = require('path');
const routes = require('./routes/routes');
const login = require('./js/login');

app.use('/', products);

app.get('/html/login.html', (reg, res) => {
  res.sendFile(path.join(__dirname, 'html/login.html'));}
  );
app.use("/", login );




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



