const comment = require("./commentSchema");

module.exports = {
  registerCommentVal: async (req, res, next) => {
    const value = await comment.registerComment.validate(req.body, {
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
