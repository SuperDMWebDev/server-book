const express = require("express");

const router = express.Router();

console.log("vao account router");
router.use("/", require("../controllers/account/home.C"));

module.exports = router;
