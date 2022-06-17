const db = require("../db");
const publishers = "public.publishers";

exports.getAllPublishers = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${publishers} 
     `);

  return rows;
};
