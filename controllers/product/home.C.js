const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  updateAllProducts,
  addNewProduct,
} = require("../../models/product/products.M");
const { addAuthor } = require("../../models/author/author.M");
const { showingPrice } = require("../../models/helper/helper.M");
const {
  getProductDetail,
  getProductImages,
} = require("../../models/product/productDetail.M");
const { getAllCategories } = require("../../models/category/category.M");
const {
  getAllPublishers,
  addPublisher,
} = require("../../models/publisher/publisher.M");
const { getAllAuthors } = require("../../models/author/author.M");
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

// GET /homepage
// C la controller
//
// / la trnag xmem thong ke
router.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    //console.log("all products", allProducts);

    getToken(req, res);

    res.render("product/product", {
      title: "Product Page | Book Store ",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "product/css",
      scriptCs: () => "product/script",
      allProducts: allProducts,
    });
  } catch (err) {
    throw Error(err);
  }
});
router.post("/add-author", async (req, res) => {
  const text = req.body.author;
  const allAuthors = await getAllAuthors();
  for (let i = 0; i < allAuthors.length; i++) {
    if (allAuthors[i].author_name === text) {
      res.redirect("/product");
      return;
    }
  }

  await addAuthor(text);
  res.redirect("/product");
});
router.post("/add-publisher", async (req, res) => {
  const text = req.body.publisher;
  const allPublishers = await getAllPublishers();
  for (let i = 0; i < allPublishers.length; i++) {
    if (allPublishers[i].author_name === text) {
      res.redirect("/product");
      return;
    }
  }
  await addPublisher(text);
  res.redirect("/product");
});
router.post("/add", async (req, res) => {
  try {
    const allValue = req.body;
    console.log("all value", allValue);
    const allProducts = await getAllProducts();
    for (let i = 0; i < allProducts.length; i++) {
      if (
        allProducts[i].product_name == allValue.name &&
        allProducts[i].author_id == allValue.author &&
        allProducts[i].publisher_id == allValue.publisher
      ) {
        console.log("exist product");
        res.redirect("/product");
        return;
      }
    }
    await addNewProduct(allValue, allProducts.length);
    return res.redirect("/product");
  } catch (err) {
    throw Error(err);
  }
});
router.get("/add", async (req, res, next) => {
  try {
    const allCategories = await getAllCategories();
    const allAuthors = await getAllAuthors();
    const allPublishers = await getAllPublishers();

    getToken(req, res);

    res.render("product/addProduct", {
      title: "Product page | Add book",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
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
    getToken(req, res);

    res.render("product/detailProduct", {
      title: "Detail product",
      Detail: detail,
      cover_link: cover,
      sub_images: images,
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "product/cssDetail",
      scriptCs: () => "product/script",
    });
  } catch (err) {
    throw Error(err);
  }
});
router.post("/update", async (req, res) => {
  try {
    const checkBoxValue = req.body;
    // //console.log("cb value ", checkBoxValue.cb1);
    const allProducts = await getAllProducts();
    const newProducts = allProducts;
    newProducts.map((item, idx) => {
      // //console.log("item ", item);

      const index = "cb".concat(idx + 1);
      // //console.log("check box value index ", index, checkBoxValue[index]);
      item.is_active = checkBoxValue[index] === "on" ? 1 : 0;
    });
    // //console.log("all products after ", newProducts);
    await updateAllProducts(newProducts);
    return res.redirect("/product");
    // res.render("product/product", {
    //   title: "Product Page | Blue Book Store ",
    //   user_name: username,
    //  user_id: idUser,
    //  role_id: role,
    //   header: () => "header",
    //   cssCs: () => "product/css",
    //   scriptCs: () => "product/script",
    //   allProducts: newProducts,
    // });
  } catch (err) {
    throw Error(err);
  }
});

module.exports = router;
