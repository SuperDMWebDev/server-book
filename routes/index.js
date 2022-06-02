// Contain main routes

const express = require("express");
const siteRoute = require("./site");
const accountRoute = require("./account");
const orderRoute = require("./order");

const router = express.Router();

console.log("vao index route");

// /homepage
router.use("/", siteRoute);
router.use("/account",accountRoute);

// Quản lý đơn hàng
router.use("/order", orderRoute);


module.exports = router;