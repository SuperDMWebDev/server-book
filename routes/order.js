const express = require("express");

const router = express.Router();

console.log("vao order router");
router.use("/", require("../controllers/order/home.C"));

router.use('/detail', require("../controllers/order/detail.C"));

module.exports = router;