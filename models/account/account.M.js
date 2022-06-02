const db = require("../db");
const accounts = "public.accounts";

exports.getAllAccounts = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${accounts} 
    where role_id!=1 `);

  return rows;
};
exports.getOneAccount = async (id) => {
  const { rows } = await db.query(`
    
  SELECT * FROM ${accounts} 
  where account_id=${id} `);

  return rows;
};
exports.updateAccount = async (accountUpdate) => {
  const { username, firstname, lastname, id, phone, address, ward, district } =
    accountUpdate;
  await db.query(
    `update ${accounts} set firstname='${firstname}', lastname='${lastname}', username='${username}', phone='${phone}', address='${address}', ward='${ward}', district='${district}'  where account_id=${id}`
  );
};
