// Contain main routes

const express = require("express");
const siteRoute = require("./site");
const accountRoute =require("./account");
const productRoute = require("./product");
const router = express.Router();

console.log("vao index route");

// /homepage
router.use("/", siteRoute);
router.use("/account",accountRoute);
router.use("/product", productRoute);


module.exports = router;