const express = require("express");
const router = express.Router();
const validate = require("../validation/user/userValidation");
const user = require("../controller/userControlers");
const { upload } = require("../middleware/imageStorage");
const authorization = require("../middleware/userAuthentication");



router.post(
  "/create",
  upload.single("profile_Pic"),
  validate.registerUserVal,
  user.userSignup
);
router.post("/login", validate.loginUserVal, user.userLogin);
router.post("/reset-password/:id/:token",authorization.userAuth ,user.resetPassword);
router.post("/send-password-email",authorization.userAuth, user.sendResetPasswordEmail);
router.get("/userBlog/:id",authorization.userAuth, user.userBlog);
router.patch("/blogUpdate/:id",authorization.userAuth ,user.updateBlog);

module.exports = router;
