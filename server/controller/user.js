const User = require("../models/users");
const bcrypt = require("bcryptjs")
const jsonwebtoken = require('jsonwebtoken')
const Register = async (req, res) => {
  try {
    const body = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(body.password, salt);
    const user_created = await User.create({
      email: body.email,
      password: hashed_password,
      username: body.username,
      image: body.image,
    });
    if (user_created) {
      res.status(200).json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
const Login = async (req, res) => {
  try {
    const body = req.body;
    console.log("heeh")
    const requested_account = await User.findOne({ email: body.email });
    if (requested_account) {
      const compare = await bcrypt.compare(
        body.password,
        requested_account.password
      );
      if (compare) {
        const token = jsonwebtoken.sign(
          { id: requested_account._id },
          process.env.SECRET,
          { expiresIn: "24h" }
        );
        res.cookie("token", token, { maxAge: 86400000 });
        res.status(200).json({ success: true, data: requested_account, token:token });
      } else {
        res.status(400).json({
          error: "Login and Password arent correct",
          success: false,
        });
      }
    } else {
      res.status(400).json({ error: "Login and Password arent correct", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
const getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user_account = await User.findById(userId).select("-password").exec();
    if (user_account) {
      res.status(200).json({ data: user_account, success: true });
    } else {
      res.status(400).json({ error: "Internal server error", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
const getUserCart = async (req, res) => {};
const getUserFavourite = async (req, res) => {};
module.exports = {
  Register,
  Login,
  getUserCart,
  getUserFavourite,
  getuser,
};
