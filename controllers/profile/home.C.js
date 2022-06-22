const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getOneAccount,
  updateProfileAccount,
} = require("../../models/account/account.M");

var username = "";
var role = 0;
var idUser = 0;

const getToken = (req, res) => {
  const access_token = req.cookies.jwt;

  if (access_token) {
    const token = access_token.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      username = data.username;
      idUser = data.id;
      role = data.role;

      return;
    });
  }
};

router.get("/", async (req, res) => {
  getToken(req, res);
  account_id = idUser;

  console.log(account_id);
  const infoAccount = await getOneAccount(account_id);
  //   console.log("infoAccount", infoAccount);
  res.render("profile/profile", {
    title: "Profile page",
    user_name: username,
    user_id: idUser,
    role_id: role,
    header: () => "header",
    cssCs: () => "profile/css",
    scriptCs: () => "profile/script",
    infoAccount: infoAccount[0],
  });
});

router.get("/edit", async (req, res) => {
  getToken(req, res);
  account_id = idUser;

  //   console.log(acocunt_id);
  const infoAccount = await getOneAccount(account_id);
  console.log("infoAccount", infoAccount);
  res.render("profile/editProfile", {
    title: "Edit profile page",
    user_name: username,
    user_id: idUser,
    role_id: role,
    header: () => "header",
    cssCs: () => "profile/css",
    scriptCs: () => "profile/script",
    infoAccount: infoAccount[0],
  });
});
router.post("/", async (req, res) => {
  console.log("vao post", req.body);
  await updateProfileAccount(req.body);
  const infoAccount = await getOneAccount(account_id);
  //   console.log("infoAccount", infoAccount);
  res.render("profile/profile", {
    title: "Profile page",
    user_name: username,
    user_id: idUser,
    role_id: role,
    header: () => "header",
    cssCs: () => "profile/css",
    scriptCs: () => "profile/script",
    infoAccount: infoAccount[0],
  });
});

module.exports = router;
