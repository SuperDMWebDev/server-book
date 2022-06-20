const express = require("express");
const router = express.Router();

//[GET] /dangxuat
router.get('/', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
});

module.exports = router;