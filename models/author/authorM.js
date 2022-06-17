const db = require("../db");
const authors = "public.authors";

exports.getAllAuthors = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${authors} 
     `);

  return rows;
};
