const express = require("express");

const router = express.Router();

console.log("vao login router");
router.use("/", require("../controllers/login/home.C"));

module.exports = router;