const express = require("express");
const router = new express.Router();
const invController = require("../Controllers/invController");

router.get("/type/:classificationId", invController.buildByClassificationId);
router.get('/sportCars', invController.getSportCars);
console.log(invController.getSportCars());
router.get('/CustomCars', invController.getCustomCars);
router.get('/SUVCars', invController.getSUVCars);
router.get('/TruckCars', invController.getTruckCars);
router.get('/sedanCars', invController.getsedanCars);

module.exports = router;