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
  const { id, status } = accountUpdate;
  await db.query(
    `update ${accounts} set account_status=${status}  where account_id=${id}`
  );
};
exports.deleteAccount = async (account_id) => {
  const { id } = account_id;
  console.log("account_id", account_id);
  await db.query(`delete from ${accounts} where account_id=${id}`);
};
exports.addAccount = async (newAccount) => {
  const {
    username,
    firstname,
    lastname,
    phone,
    address,
    ward,
    district,
    province,
  } = newAccount;
  await db.query(
    `insert into ${accounts}(username,pwd,firstname,lastname,phone,address,ward,district,province,role_id,account_status) values('${username}','12345678','${firstname}','${lastname}','${phone}','${address}','${ward}','${district}','${province}','2','1')`
  );
};
