const db = require("../db");
const products = "public.products";
// M la model
exports.getFiveProducts = async (
  firstID,
  secondID,
  thirdID,
  fourthID,
  fifthID
) => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${products} 
    WHERE  "product_id" = '${firstID}' OR "product_id" = '${secondID}' OR "product_id" = '${thirdID}'
    OR "product_id" = '${fourthID}' OR "product_id" = '${fifthID}'
    `);

  return rows;
};

exports.getAllProducts = async () => {
  const { rows } = await db.query(`SELECT * from ${products}`);

  return rows;
};

exports.showingPrice = (price) => {
  price = parseInt(price);
  return String(price).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};
const updateItem = async (item) => {
  const { product_id, is_active } = item;
  console.log("new product", product_id, is_active);
  await db.query(
    `update ${products} set "is_active"='${is_active}' where "product_id"='${product_id}'`
  );
};
exports.updateAllProducts = async (newProducts) => {
  console.log("new products", newProducts);
  for (let i = 0; i < newProducts.length; i++) {
    await updateItem(newProducts[i]);
  }
};
exports.addNewProduct = async (value) => {
  const { name, description, category, author, publisher, price, stock } =
    value;
  await db.query(
    `insert into ${products}(product_name,description,category_id,author_id,publisher_id,price,stock,is_active) values('${name}','${description}','${category}','${author}','${publisher}','${price}','${stock}','1') `
  );
};
