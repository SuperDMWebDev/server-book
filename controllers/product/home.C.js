const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  updateAllProducts,
  addNewProduct,
} = require("../../models/product/products.M");

const { showingPrice } = require("../../models/helper/helper.M");
const {
  getProductDetail,
  getProductImages,
} = require("../../models/product/productDetail.M");
const { getAllCategories } = require("../../models/category/categoryM");
const { getAllPublishers } = require("../../models/publisher/publisherM");
const { getAllAuthors } = require("../../models/author/authorM");
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
    console.log("all products", allProducts);

    getToken(req, res)

    res.render("product/product", {
      title: "Product Page | Book Store ",
      role_id: role,
      cssCs: () => "product/css",
      scriptCs: () => "product/script",
      allProducts: allProducts,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.post("/add", async (req, res) => {
  try {
    const allValue = req.body;
    // console.log("cb value ", checkBoxValue.cb1);
    console.log("all value", allValue);
    // console.log("all products after ", newProducts);
    const allProducts = await getAllProducts();
    await addNewProduct(allValue, allProducts.length);
    return res.redirect("/product");
    // res.render("product/product", {
    //   title: "Product Page | Blue Book Store ",
    //   role_id: role,
    //   cssCs: () => "product/css",
    //   scriptCs: () => "product/script",
    //   allProducts: newProducts,
    // });
  } catch (err) {
    throw Error(err);
  }
});
router.get("/add", async (req, res, next) => {
  try {
    const allCategories = await getAllCategories();
    const allAuthors = await getAllAuthors();
    const allPublishers = await getAllPublishers();

    getToken(req, res)

    res.render("product/addProduct", {
      title: "Product page | Add book",
      role_id: role,
      cssCs: () => "product/css",
      scriptCs: () => "product/script",
      allCategories: allCategories,
      allAuthors: allAuthors,
      allPublishers: allPublishers,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.get("/detail/:id", async (req, res) => {
  let p_id = req.params.id;
  let detail = await getProductDetail(p_id);

  detail.price = showingPrice(detail.price);
  if (detail.is_active == 0) {
    detail.is_active = "Khóa";
  } else {
    detail.is_active = "Hoạt động";
  }

  let images = await getProductImages(p_id);
  cover = images.shift(0).image_link;

  try {
    getToken(req, res)

    res.render("product/detailProduct", {
      title: "Detail product",
      Detail: detail,
      cover_link: cover,
      sub_images: images,
      role_id: role,
      cssCs: () => "product/css",
      scriptCs: () => "product/script",
    });
  } catch (err) {
    throw Error(err);
  }
});
router.post("/update", async (req, res) => {
  try {
    const checkBoxValue = req.body;
    // console.log("cb value ", checkBoxValue.cb1);
    const allProducts = await getAllProducts();
    const newProducts = allProducts;
    newProducts.map((item, idx) => {
      // console.log("item ", item);

      const index = "cb".concat(idx + 1);
      // console.log("check box value index ", index, checkBoxValue[index]);
      item.is_active = checkBoxValue[index] === "on" ? 1 : 0;
    });
    // console.log("all products after ", newProducts);
    await updateAllProducts(newProducts);
    return res.redirect("/product");
    // res.render("product/product", {
    //   title: "Product Page | Blue Book Store ",
    //   role_id: role,
    //   cssCs: () => "product/css",
    //   scriptCs: () => "product/script",
    //   allProducts: newProducts,
    // });
  } catch (err) {
    throw Error(err);
  }
});

module.exports = router;
