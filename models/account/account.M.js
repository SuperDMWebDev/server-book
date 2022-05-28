const db = require("../db");
const accounts = "public.accounts";

exports.getAllAccounts = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${accounts} 
    where role_id!=1 `);

  return rows;
};
