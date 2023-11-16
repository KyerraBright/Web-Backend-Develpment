/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
const app = express()
const static = require("./views/routes/static")
const baseController = require("./views/Controllers/baseController")
const invroute = require("./views/routes/inventoryRoute")
const utilities = require("./views/utilities/")



/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout.ejs") // not at views root
/* ***********************
 * Routes
 *************************/
app.use(static)

app.use("/inv", invroute)
app.get("/", baseController.buildHome)
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})
app.get("/", utilities.handleErrors(baseController.buildHome))


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);

  let message;
  switch (err.status) {
    case 404:
      message = err.message || 'Sorry, the page was not found.';
      break;
    case 500:
      message = 'Oops! Internal server error occurred.';
      break;
    // Add more cases for other status codes if needed

    default:
      message = 'Oh no! There was a crash. Maybe try a different route?';
      break;
  }

  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  });
});
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
})
