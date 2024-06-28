const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
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
    console.log("heeh");
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
        res
          .status(200)
          .json({ success: true, data: requested_account, token: token });
      } else {
        res.status(400).json({
          error: "Login and Password arent correct",
          success: false,
        });
      }
    } else {
      res
        .status(400)
        .json({ error: "Login and Password arent correct", success: false });
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
const getUserCart = async (req, res) => {
  try {
    console.log('fetching user cart');
    const { id } = req.params;
    const { limit, skip } = req.query;
    console.log(id, limit, skip);

    // Populate the shoeId field within the cart array
    const cart = await User.findOne({ _id: id })
      .populate({
        path: 'cart.shoeId',
        model: 'Shoe',
      })
      .exec();

    if (cart) {
      res.status(200).json({ cart: cart.cart, success: true });
    } else {
      res.status(400).json({ error: 'User not found', success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Internal server error', success: false });
  }
};

const getUserFavourite = async (req, res) => {
  try {
    console.log('fetching user cart');
    const { id } = req.params;
    const { limit, skip } = req.query;
    console.log(id, limit, skip);

    // Populate the shoeId field within the cart array
    const fav = await User.findOne({ _id: id })
      .populate({
        path: 'favourite.shoeId',
        model: 'Shoe',
      })
      .exec();

    if (cart) {
      res.status(200).json({ favourite: fav.favourite, success: true });
    } else {
      res.status(400).json({ error: 'User not found', success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Internal server error', success: false });
  }
};
const addInCart = async (req, res) => {
  try {
    const { UserId, ShoeId,Color,Size,Quantity } = req.body;
    const object = {
      shoeId:ShoeId,
      color:Color,
      size:Size,
      quantity:Quantity
    }
    console.log(UserId,object)
    const updated_user = await User.findOneAndUpdate(
      { _id:UserId },
      { $push: { cart: object } },
      {new:true}
    );
    if (updated_user) {
      console.log(updated_user)
      res.status(200).json({ updated_user, success: true });
    } else {
      console.log('nuh')
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
};
const addInFavourite = async (req, res) => {
  try {
    const { userId, ShoeId,Color,Size,Quantity } = req.body;
    const object = {
      shoeId:ShoeId,
      color:Color,
      size:Size,
      quantity:Quantity
    }
    const updated_user = await User.findOneAndUpdate(
      { userId },
      { $push: { favourite: object } },
      {new:true}
    );
    if (updated_user) {
      res.status(200).json({ updated_user, success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
};
module.exports = {
  Register,
  Login,
  getUserCart,
  getUserFavourite,
  getuser,
  addInCart,
  addInFavourite
};
