const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}
// invController.js

// Assuming you have your necessary imports and dependencies here

async function buildByClassificationId(req, res) {
  try {
    // Your route handling logic here
  } catch (error) {
    console.error("Error in buildByClassificationId:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { buildByClassificationId };

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}