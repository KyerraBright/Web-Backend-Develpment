const express = require('express');
const app = express();
const env = require("dotenv").config()
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'KyerraBright', // Replace with your database username
  password: 'March12001', // Replace with your database password
  database: 'Malea' // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Example query
connection.query('SELECT * FROM yourtable', (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
});