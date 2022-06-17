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
    await db.query(`select x.username, y.comment_id,y.comment_body, 
  y.comment_time from ${accounts} 
  x join ${comments} y on x.account_id = y.account_id`);
  return rows;
};
exports.deleteComment = async (id) => {
  await db.query(`delete from ${comments} where comment_id=${id}`);
};
