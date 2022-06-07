const express = require("express");

const router = express.Router();

console.log("vao product router");
router.use("/", require("../controllers/product/home.C"));

module.exports = router;
