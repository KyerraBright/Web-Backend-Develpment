const utilities = require("../utilities/")
const baseController = {}
const express = require("express")
const env = require("dotenv").config()
const app = express()



baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

module.exports = baseController