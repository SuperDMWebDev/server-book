const db = require("../db");
const publishers = "public.publishers";

exports.getAllPublishers = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${publishers} 
     `);

  return rows;
};
exports.addPublisher = async (name) => {
  await db.query(
    `insert into ${publishers}(publisher_name) values('${name}') `
  );
};
