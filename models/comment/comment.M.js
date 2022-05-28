const db = require("../db");
const comments = "public.comments";

exports.getAllComments = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${comments} 
     `);

  return rows;
};
