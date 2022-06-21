const express = require("express");
const router = express.Router();
const {
  getAllCommentsWithAccount,
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