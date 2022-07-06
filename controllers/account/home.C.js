const express = require("express");
const router = express.Router();

const {
  getAllAccounts,
  getOneAccount,
  updateAccount,
  deleteAccount,
  addAccount,
} = require("../../models/account/account.M");
const jwt = require("jsonwebtoken");

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

router.get("/", async (req, res, next) => {
  try {
    const allAccounts = await getAllAccounts();

    getToken(req, res);

    res.render("account/account", {
      title: "Account page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      allAccounts: allAccounts,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.get("/add", async (req, res, next) => {
  try {
    getToken(req, res);

    res.render("account/addAccount", {
      title: "Account add page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
    });
  } catch (err) {
    throw Error(err);
  }
});
router.get("/delete/:id", async (req, res, next) => {
  try {
    const deleteAccountId = req.params;
    ////console.log("delete account ", deleteAccountId);
    await deleteAccount(deleteAccountId);

    getToken(req, res);
    const allAccounts = await getAllAccounts();

    res.render("account/account", {
      title: "Account page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
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
    ////console.log("account update", accountUpdate);
    await updateAccount(accountUpdate);

    getToken(req, res);
    const allAccounts = await getAllAccounts();

    res.render("account/account", {
      title: "Account page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      allAccounts: allAccounts,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const newAccount = req.body;
    const allAccounts = await getAllAccounts();
    getToken(req, res);
    for (let i = 0; i < allAccounts.length; i++) {
      if (newAccount.username == allAccounts[i].username) {
        res.redirect("/account");
        return;
      }
    }

    await addAccount(newAccount);
    res.redirect("/account");
    /*
    res.render("account/account", {
      title: "Account page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "account/css",
      scriptCs: () => "account/script",
      allAccounts: allAccounts,
    });
    */
  } catch (err) {
    throw Error(err);
  }
});
router.get("/edit/:id", async (req, res, next) => {
  try {
    //console.log("req params", req.params);
    // nhan vao :id nen la id= .id;
    const id = req.params.id;
    const oneAccount = await getOneAccount(id);
    //console.log("one account", oneAccount[0]);

    getToken(req, res);

    res.render("account/editAccount", {
      title: "Account edit page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
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

//     res.render("account/account", {
//       title: "Home page | Blue Book Store ",
//       user_name: username,
//      user_id: idUser,
//      role_id: role,
//       header: () => "header",
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
