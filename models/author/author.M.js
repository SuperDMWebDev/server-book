const db = require("../db");
const authors = "public.authors";

exports.getAllAuthors = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${authors} 
     `);

  return rows;
};
exports.addAuthor = async (name) => {
  await db.query(`insert into ${authors}(author_name) values('${name}') `);
};
