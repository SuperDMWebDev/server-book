const express = require("express");
const router = express.Router();

const { getAllProducts } = require("../../models/product/products.M");
const { getAllAccounts } = require("../../models/account/account.M");
const { getAllOrders } = require("../../models/order/order.M");
const { getAllComments } = require("../../models/comment/comment.M");
// GET /homepage
// C la controller
//
// / la trnag xmem thong ke
router.get("/admin", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    const allAccounts = await getAllAccounts(); // tru tai khoan admin
    const allOrders = await getAllOrders();
    const allComments = await getAllComments();

    res.render("home", {
      title: "Home page | Blue Book Store ",
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
