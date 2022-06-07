const express = require("express");
const router = express.Router();

const { getAllProducts, updateAllProducts } = require("../../models/product/products.M");
// GET /homepage
// C la controller
//
// / la trnag xmem thong ke
router.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    // console.log("all products", allProducts);
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
    res.render("product", {
      title: "Product Page | Blue Book Store ",
      cssCs: () => "product/css",
      scriptCs: () => "product/script",
      allProducts: newProducts,
    });
  } catch (err) {
    throw Error(err);
  }
});

module.exports = router;
