const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const userAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const {userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(userID).select("-password");
      next();
    } catch (err) {
      res
        .status(401)
        .send({ status: "Failed", message: "unauthorized User" + err });
    }
  }if (!token) {
    res.status(400).send({
    message: "Unauthorized User NO Token" 
   });
  }
};

module.exports = {
  userAuth,
};
