const db = require("../db");
const comments = "public.comments";
const accounts = "public.accounts";
exports.getAllComments = async () => {
  const { rows } = await db.query(`
    
    SELECT * FROM ${comments} 
     `);

  return rows;
};
exports.getAllCommentsWithAccount = async () => {
  const { rows } =
    await db.query(`select x.username, y.* from ${accounts} 
  x join ${comments} y on x.account_id = y.account_id
  order by y.comment_time desc`);
  return rows;
};
exports.updateComment = async (id, field, value) => {
  await db.query(`update ${comments} set ${field} = ${value} where comment_id = ${id}`);
}
exports.deleteComment = async (id) => {
  await db.query(`delete from ${comments} where comment_id=${id}`);
};
