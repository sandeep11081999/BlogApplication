const Joi = require("@hapi/joi");

const schema = {
  registerBlog: Joi.object({
    title: Joi.string().max(20).min(2).required(),
    discription: Joi.string().max(100).min(5).required(),
    status: Joi.boolean().required(),
  }).unknown(true),
};

module.exports = schema;
