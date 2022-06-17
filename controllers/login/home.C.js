const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    res.render('./login', {
        title: "Login page",
          cssCs: () => "login/css",
          scriptCs: () => "login/script",
    })
})

module.exports = router;