// Contain main routes

const express = require("express");
const siteRoute = require("./site");
const accountRoute =require("./account");
const productRoute = require("./product");
const orderRoute = require("./order");
const loginRoute = require("./login");

const router = express.Router();

console.log("vao index route");

// /homepage
router.use("/", siteRoute);
router.use("/account",accountRoute);
router.use("/product", productRoute);

// Quản lý đơn hàng
router.use("/order", orderRoute);

// Đăng nhập
router.use("/login", loginRoute);

module.exports = router;