const express = require("express");
const router = express.Router();

const {
  getAllAccounts,
  getOneAccount,
  updateAccount
} = require("../../models/account/account.M");
router.get("/", async (req, res, next) => {
  try {
    const allAccounts = await getAllAccounts();

    res.render("account", {
      title: "Account page",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      allAccounts: allAccounts,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const accountUpdate = req.body;
    console.log("account update", accountUpdate);
    await updateAccount(accountUpdate);
    const allAccounts = await getAllAccounts();

    res.render("account", {
      title: "Account page",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      allAccounts: allAccounts,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.get("/edit/:id", async (req, res, next) => {
  try {
    console.log("req params", req.params);
    // nhan vao :id nen la id= .id;
    const id = req.params.id;
    const oneAccount = await getOneAccount(id);
    console.log("one account", oneAccount[0]);
    res.render("editAccount", {
      title: "Account edit page",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      oneAccount: oneAccount[0],
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
