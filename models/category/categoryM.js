const db = require("../db");
const categories = "public.categories";

exports.getAllCategories = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${categories} 
     `);

  return rows;
};
