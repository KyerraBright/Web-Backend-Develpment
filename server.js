const express = require('express');
const app = express();
const env = require("dotenv").config();
const path = require('path'); 
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'KyerraBright', 
  password: 'March12001', 
  database: 'Malea' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Create a new route to serve data to the front-end
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM yourtable'; // Query your table
  
  connection.query(query, (error, results, fields) => {
      if (error) {
          console.error('Error in the query: ', error);
          res.status(500).send('Server error');
          return;
      }
      
      // Function to determine the MIME type based on the image buffer
      const getMimeType = (buffer) => {
          const header = buffer.toString('hex', 0, 4); // Read first few bytes
          if (header.startsWith('89504e47')) {
              return 'image/png'; // PNG header
          } else if (header.startsWith('ffd8ffe0') || header.startsWith('ffd8ffe1')) {
              return 'image/jpeg'; // JPEG header
          }
          return 'application/octet-stream'; // Fallback
      };

      // Convert Buffer to base64 and determine MIME type
      const modifiedResults = results.map(row => {
          const mimeType = getMimeType(row.image);
          return {
              design: row.Design,
              color: row.Color,
              size: row.Size,
              price: row.Price,
              image: row.image ? `data:${mimeType};base64,${row.image.toString('base64')}` : null
          };
      });

      console.log("Modified Results: ", modifiedResults);
      res.json(modifiedResults); // Send the results as JSON
  });
});



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
