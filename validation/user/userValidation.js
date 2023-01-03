const userValidation = require("./user_Schema");

module.exports = {
  registerUserVal: async (req, res, next) => {
    console.log("====>",req.body)
    const value = await userValidation.registerUser.validate(req.body, {
      abortEarly : false,
    });
    if (value.error) {
      res.send({
        status : 204,
        message : value.error.details[0].message,
      });
    } else {
      next();
    }
  },
  loginUserVal: async (req, res, next) => {
    console.log("====>",req.body)
    const value = await userValidation.loginUser.validate(req.body, {
      abortEarly : false,
    });
    if (value.error) {
      res.send({
        status : 204,
        message : value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
