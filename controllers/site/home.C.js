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
  // access_token có dạng  `Beaer [token]`
  if (typeof access_token == "undefined") {
    // unauthorized
    return res.redirect("/login");
  }

  const token = access_token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(401).send(
        `<style>
          h1{
              text-align:center;
          }
          a{
              display:block;
              text-align:center;
          }
          button{
          border:none;
          border-radius:15px;
          background-color:#176fd3;
          padding: 1rem 2rem;
          color:white;
          font-size:1.8rem;
          }
          </style>
          <h1> Phiên hết hạn. Hãy đăng nhập lại </h1>
          <a href ="/login">
          <button> Đăng nhập </button>
          </a>`
      );
      res.locals.user = null;
    }
  })

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
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
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
