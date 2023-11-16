const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(invCont)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


invCont.getSportCars = async function (req, res, next) {
  const classification_id = '2'; // Assuming 'sport' is the car_type for sport cars

  try {
    const sportCars = await invModel.getCarsByType(classification_id);
    res.status(200).json({ sportCars });
  } catch (error) {
  }
};


invCont.getCustomCars = async function (req, res, next) {
  const classification_id = '1'; // Assuming 'custom' is the car_type for sport cars

  try {
    const customCars = await invModel.getCarsByType(classification_id);

    // Further processing if needed

    res.render('./inventory/type/1', { customCars });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


invCont.getSUVCars = async function (req, res, next) {
  const classification_id = '3'; // Assuming 'SUV' is the car_type for sport cars

  try {
    const SUVCars = await invModel.getCarsByType(classification_id);

    // Further processing if needed

    res.status(200).json({ SUVCars });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

invCont.getTruckCars = async function (req, res, next) {
  const classification_id = '4'; // Assuming 'Truck' is the car_type for sport cars

  try {
    const TruckCars = await invModel.getCarsByType(classification_id);

    // Further processing if needed

    res.status(200).json({ TruckCars });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

invCont.getsedanCars = async function (req, res, next) {
  const classification_id = '5'; // Assuming 'Truck' is the car_type for sport cars

  try {
    const sedanCars = await invModel.getCarsByType(classification_id);

    // Further processing if needed

    res.status(200).json({ sedanCars });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = invCont;
