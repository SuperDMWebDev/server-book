const express = require("express");

const router = express.Router();

console.log("vao login router");
router.use("/", require("../controllers/auth/logIn.C"));

module.exports = router;