const express = require('express');
const app = express();
const env = require("dotenv").config();
const products = require('./js/products');
const routes = require('./routes/routes');


app.use('/', products);
app.use("/",routes);




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000; // Fallback to port 3000 if PORT is not defined
const host = process.env.HOST || 'localhost'; // Fallback to localhost if HOST is not defined



/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});



