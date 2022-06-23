const express = require("express");
const router = express.Router();
const {
  getAllCommentsWithAccount,
  updateComment,
  deleteComment,
} = require("../../models/comment/comment.M");
const { convertDate } = require("../../models/helper/helper.M");
const jwt = require('jsonwebtoken');

var username = "";
var role = 0;
var idUser = 0;

const getToken = (req, res) => {
  const access_token = req.cookies.jwt;

  if (access_token) {
      const token = access_token.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
          username = data.username
          idUser = data.id;
          role = data.role;

          return;
      });
  }
};

router.get("/", async (req, res, next) => {
  const allComments = await getAllCommentsWithAccount();
  //console.log("all comments", allComments);
  getToken(req, res)

  for (let i in allComments) {
    allComments[i].comment_time = convertDate(allComments[i].comment_time)
  }

  try {
    res.render("comment/comment", {
      title: "Comment page",
      user_name: username,
      user_id: idUser,
      role_id: role,
      header: () => "header",
      cssCs: () => "comment/css",
      scriptCs: () => "comment/script",
      allComments: allComments,
    });
  } catch (e) {
    console.log("e", e);
  }
});
router.post("/update", async (req, res) => {
  const checkBoxValue = req.body;
  allComment = await getAllCommentsWithAccount();
  for (let idx = 1; idx <= Object.keys(allComment).length; idx++) {
    // //console.log("item ", item);

    const index = "cb".concat(idx);
    if (checkBoxValue[index] == "on"){
      await updateComment(idx, "comment_status", 1);
    } else {
      await updateComment(idx, "comment_status", 0);
    }
    // //console.log("check box value index ", index, checkBoxValue[index]);
    //comment.comment_status = checkBoxValue[index] === "on" ? 1 : 0;
  };

  return res.redirect("/comment");
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