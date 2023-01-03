const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const { transporter } = require("../service/mailService");
const blogSchema = require("../model/blogSchema");

const userSignup = async (req, res) => {
  const user = new userSchema(req.body);
  try {
    const exits = await User.findOne({ email: req.body.email });
    if (exits) {
      return res.status(403).json({
        success: false,
        message: "email already exited",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const filepath = `/uploads/${req.file.filename}`;
    user.profile_Pic = filepath;
    const userData = await user.save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully ",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const login = await User.findOne({ email: email });
      if (login != null) {
        const match = await bcrypt.compare(password, login.password);
        if (login.email == email && match) {
          const token = jwt.sign(
            { userID: login._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
          );
          const userShow = await User.findOne(
            { email: login.email },
            "-password"
          );
          return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            userToken: token,
            userData: userShow,
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Invalid email or password",
          });
        }
      } else {
        res.status(401).send({
          " success": false,
          " message": "you are not valid user",
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const userBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findData = await blogSchema.find({ user_id: id });
    res.status(200).json({
      success: true,
      message: "Successfully",
      Blog: findData,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const update = await blogSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Blog Update Successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const secret = user.id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "30d",
      });
      const link = `http://127.0.0.1:3000/api/user/reset${user._id}/${token}}`;
      let info = await transporter.sendMail({
        from: "narendracharan25753@gmail.com",
        to: email,
        subject: "Email send for reset password",
        text: `<a href=${link}></a>`,
      });
      res.status(200).send({
        " success": true,
        message: "Email send Successfully",
        token: token,
        user_ID: user.id,
      });
    } else {
      res.status(550).send({
        success: false,
        message: "Email is required",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { password, confirm_password } = req.body;
  const { token, id } = req.params;
  const user = await User.findById(id);
  const secret = user.id + process.env.JWT_SECRET_KEY;
  try {
    jwt.verify(token, secret);
    if (password && confirm_password) {
      if (password !== confirm_password) {
        res.status(401).send({
          success: false,
          message: "password or confirm_password could not be same",
        });
      } else {
        const salt = await bcrypt.genSalt(100);
        const new_password = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user.id, {
          $set: { password: new_password },
        });
        res.status(200).send({
          success: true,
          " message": "Password reset successfully",
        });
      }
    } else {
      res.status(403).send({
        success: false,
        " message": "All Field are required",
      });
    }
  } catch (err) {
    res.status(500).send({
      " success": false,
      message: err.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  resetPassword,
  sendResetPasswordEmail,
  userBlog,
  updateBlog,
};
