const joi = require("@hapi/joi");
joi.objectid = require("joi-objectid")(joi);

const schema = {
  registerComment: joi
    .object({
      comment: joi.string().max(50).min(2).required(),
      user_id: joi.objectid().required(),
      blog_id: joi.objectid().required(),
    })
    .unknown(true),
};
module.exports = schema;
