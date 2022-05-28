const express = require("express");
const router = express.Router();

const {getAllAccounts}=require("../../models/account/account.M");
router.get("/", async (req, res,next) => {
  try {

    const allAccounts= await getAllAccounts();
    res.render("account", {
      title: "Account page",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      allAccounts:allAccounts
    });
  } catch (err) {
    throw Error(err);
  }
});

// // GET /homepage
// // C la controller
// //
// // / la trnag xmem thong ke
// router.get("/", async (req, res) => {
//   try {
//     const allProducts = await getAllProducts();
//     const allAccounts = await getAllAccounts(); // tru tai khoan admin
//     const allOrders = await getAllOrders();
//     const allComments = await getAllComments();

//     res.render("account", {
//       title: "Home page | Blue Book Store ",
//       cssCs: () => "account/css",
//       scriptCs: () => "account/script",
//   allProducts: allProducts,
//   allAccounts: allAccounts,
//   allOrders: allOrders,
//   allComments: allComments,
//     });
//   } catch (err) {
//     throw Error(err);
//   }
// });

module.exports = router;
