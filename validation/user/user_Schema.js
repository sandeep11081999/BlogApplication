const joi = require("@hapi/joi");

const schema = {
  registerUser: joi
    .object({
      name: joi.string().max(20).min(2).required().messages({
        "string.base": `"a" should be a type of 'text'`,
        "string.empty": `"a" cannot be an empty field`,
        "string.min": `"a" should have a minimum length of {#limit}`,
        "any.required": `"a" is a required field`,
      }),
      email: joi.string().email().required().messages({
        "string.base": `"a" should be a type of 'text'`,
        "string.empty": `"a" cannot be an empty field`,
        "any.required": `"a" is a required field`,
      }),
      // profile_Pic : joi.string().required(),
      password: joi.string().max(8).min(2).required().messages({
        "string.empty": `"a" cannot be an empty field`,
        "string.min": `"a" should have a minimum length of {#limit}`,
        "any.required": `"a" is a required field`,
      }),
      city: joi.string().required().messages({
        "string.empty": `"a" cannot be an empty field`,
        "any.required": `"a" is a required field`,
      }),
      state: joi.string().required().messages({
        "string.empty": `"a" cannot be an empty field`,
        "any.required": `"a" is a required field`,
      }),
    })
    .unknown(true),

    loginUser:joi.object({
      email: joi.string().email().required().messages({
        "string.base": `"a" should be a type of 'text'`,
        "string.empty": `"a" cannot be an empty field`,
        "any.required": `"a" is a required field`,
      }),
      password: joi.string().max(8).min(2).required().messages({
        "string.empty": `"a" cannot be an empty field`,
        "string.min": `"a" should have a minimum length of {#limit}`,
        "any.required": `"a" is a required field`,
      }),
    }).unknown(true)
};
module.exports = schema;
