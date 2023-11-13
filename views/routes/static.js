const express = require('express');
const router = express.Router();

console.log('routes');

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css/styles.css"));
console.log(__dirname + "public/css/styles.css");
router.use("/js", express.static(__dirname + "public/js/script.js"));
console.log(__dirname + "public/js/script.js");
router.use("/images", express.static(__dirname + "public/images"));
console.log(__dirname + "public/images");

module.exports = router;



