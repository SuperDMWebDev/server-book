// Contain main routes

const express = require("express");
const siteRoute = require("./site");
const accountRoute =require("./account");

const router = express.Router();

console.log("vao index route");

// /homepage
router.use("/", siteRoute);
router.use("/account",accountRoute);



module.exports = router;