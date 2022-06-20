const db = require("../db");

exports.getOne = async function(fieldName, value) {
    const data = await db.query(`SELECT * FROM accounts  WHERE "${fieldName}" = '${value}'`);
    return data.rows;
}