const express = require("express");
const router = express.Router();
const userRoutes = require("../routes/userRoutes");
const blogRoutes = require("../routes/blogRotues");
const commentRoutes = require("../routes/commentRoutes");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
