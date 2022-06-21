const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

var username = "";
var role = 0;
var idUser = 0;

const getToken = (req, res) => {
  const access_token = req.cookies.jwt;

  if (access_token) {
      const token = access_token.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
          username = data.username
          idUser = data.id;
          role = data.role;

          return;
      });
  }
};

router.get("/", async (req, res) => {
    getToken(req, res);
    acocunt_id = idUser;

    console.log(acocunt_id)

    res.render("profile/profile", {
        title: "Profile page",
        user_name: username,
        user_id: idUser,
        role_id: role,
        header: () => "header",
        cssCs: () => "profile/css",
        scriptCs: () => "profile/script",
    });
});

router.get("/edit", async (req, res) => {
    getToken(req, res);
    acocunt_id = idUser;

    console.log(acocunt_id)

    res.render("profile/editProfile", {
        title: "Edit profile page",
        user_name: username,
        user_id: idUser,
        role_id: role,
        header: () => "header",
        cssCs: () => "profile/css",
        scriptCs: () => "profile/script",
    });
});

module.exports = router;