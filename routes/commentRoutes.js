const express = require("express");
const router = express.Router();
const commentVal = require("../validation/comment/commentValidation");
const comment = require("../controller/commentControlers");
const authorization= require('../middleware/userAuthentication')

router.use("/addComment",authorization.userAuth)

router.post(
  "/addComment",
  commentVal.registerCommentVal,
  comment.registerComment
);

module.exports = router;
