const db = require("../db");
const orders = "public.orders";
// lay toan bo don hang
exports.getAllOrders = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${orders} 
     `);

  return rows;
};
