const blogValidation = require("./blog_Schema");

module.exports = {
  registerBlogValidation: async (req, res, next) => {
    const value = await blogValidation.registerBlog.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      return res.send({
        status: 204,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
