const express = require("express");
const router = express.Router();
const validation = require("../validation/blog/blogValidation");
const blog = require("../controller/blogControlers");
const { upload } = require("../middleware/imageStorage");
const authorization=require('../middleware/userAuthentication')

router.use("/create",authorization.userAuth)
router.use("/detail/:id",authorization.userAuth)
router.use("/list",authorization.userAuth)
router.use("/blogDelete/:id",authorization.userAuth)
router.use("/like/:id/:likes",authorization.userAuth)
router.use("/search-Blog",authorization.userAuth)

router.post(
  "/create",
  upload.single("blog_Pic"),
  validation.registerBlogValidation,
  blog.registerBlog
);
router.get("/detail/:id", blog.blogDetail);
router.get("/list", blog.blogList);
router.delete("/blogDelete/:id", blog.blogDelet);
router.get("/like/:id/:likes", blog.likeBlog);
router.post('/search-Blog',blog.searchBlog)

module.exports = router;
