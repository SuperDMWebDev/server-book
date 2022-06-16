const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  updateAllProducts,
} = require("../../models/product/products.M");

const { showingPrice } = require("../../models/helper/helper.M");
const { getProductDetail, getProductImages } = require("../../models/product/productDetail.M");

// GET /homepage
// C la controller
//
// / la trnag xmem thong ke
router.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    console.log("all products", allProducts);
    res.render("product", {
      title: "Product Page | Blue Book Store ",
      cssCs: () => "product/css",
      scriptCs: () => "product/script",
      allProducts: allProducts,
    });
  } catch (err) {
    throw Error(err);
  }
});
// router.get("/update", async(req,res,next)=>{
//     try{
//         const a= document.getElementsByClassName("check-status");
//         console.log("a", a);
//     }catch(err){
//         throw Error(err);
//     }
// })
router.get("/detail/:id", async (req, res) => {
  let p_id = req.params.id;
  let detail = await getProductDetail(p_id)
  
  detail.price = showingPrice(detail.price)
  if (detail.is_active == 0) {
    detail.is_active = "Khóa"
  }
  else {
    detail.is_active = "Hoạt động"
  }

  let images = await getProductImages(p_id)
  cover = images.pop(0).image_link

  try {
    res.render("detailProduct", {
      title: "Detail product",
      Detail: detail,
      cover_link: cover,
      sub_images: images,
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
    // res.render("product", {
    //   title: "Product Page | Blue Book Store ",
    //   cssCs: () => "product/css",
    //   scriptCs: () => "product/script",
    //   allProducts: newProducts,
    // });
  } catch (err) {
    throw Error(err);
  }
});

module.exports = router;
