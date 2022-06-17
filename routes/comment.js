const express = require("express");

const router = express.Router();

console.log("vao comment router");
router.use("/", require("../controllers/comment/home.C"));

module.exports = router;
