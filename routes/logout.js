const express = require("express");

const router = express.Router();

console.log("vao logout router");
router.use("/", require("../controllers/auth/logOut.C"));

module.exports = router;