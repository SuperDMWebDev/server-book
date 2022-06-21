const express = require("express");

const router = express.Router();

console.log("vao profile router");
router.use("/", require("../controllers/profile/home.C"));

module.exports = router;
