// Contain main routes

const express = require("express");
const siteRoute = require("./site");
const accountRoute = require("./account");
const productRoute = require("./product");
const orderRoute = require("./order");
const commentRoute = require("./comment");
const loginRoute = require("./login");
const logoutRoute = require("./logout");
const profileRoute = require("./profile");
const { authenToken, checkUserIsLogin } = require('../middlewares/authorizacation.Mw')

const router = express.Router();

console.log("vao index route");

// /homepage
router.use("/", siteRoute);
router.use("/account", authenToken, accountRoute);
router.use("/product", authenToken, productRoute);

// Quản lý đơn hàng
router.use("/order", authenToken, orderRoute);

//quan ly binh luan
router.use("/comment", authenToken, commentRoute);
// Đăng nhập
router.use("/login", checkUserIsLogin, loginRoute);
// Đăng xuất
router.use("/logout", logoutRoute);

// Thông tin cá nhân
router.use("/profile", authenToken, profileRoute);

module.exports = router;