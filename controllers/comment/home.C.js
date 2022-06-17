const express = require("express");
const router = express.Router();
const {
  getAllCommentsWithAccount,
  deleteComment,
} = require("../../models/comment/comment.M");
router.get("/", async (req, res, next) => {
  const allComments = await getAllCommentsWithAccount();
  // console.log("all comments", allComments);
  try {
    res.render("comment", {
      title: "Comment page",
      cssCs: () => "comment/css",
      scriptCs: () => "comment/script",
      allComments: allComments,
    });
  } catch (e) {
    console.log("e", e);
  }
});
router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteComment(id);
    res.redirect("/comment");
  } catch (e) {
    console.log("e", e);
  }
});
module.exports = router;
