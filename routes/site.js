const express = require("express");

const router = express.Router();

console.log("vao site router");
router.use("/", require("../controllers/site/home.C"));

module.exports = router;
