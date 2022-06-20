const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../../models/product/products.M");
const { getAllAccounts } = require("../../models/account/account.M");
const { getAllOrders } = require("../../models/order/order.M");
const { getAllComments } = require("../../models/comment/comment.M");
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
// GET /homepage
// C la controller
//
// / la trnag xmem thong ke
router.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    const allAccounts = await getAllAccounts(); // tru tai khoan admin
    const allOrders = await getAllOrders();
    const allComments = await getAllComments();

    getToken(req, res)
    
    res.render("home", {
      title: "Home page | Blue Book Store ",
      role_id:  role,
      cssCs: () => "home/css",
      scriptCs: () => "home/script",
      allProducts: allProducts,
      allAccounts: allAccounts,
      allOrders: allOrders,
      allComments: allComments,
    });
  } catch (err) {
    throw Error(err);
  }
});



module.exports = router;
