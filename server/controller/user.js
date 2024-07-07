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
  // send populated version of carts
  try {
    const body = req.body;
    const requested_account = await User.findOne({ email: body.email })
      .populate({
        path: "cart.shoe", // Specify the path to the shoe field inside the cart array
        model: "Shoe", // Specify the model to populate
      })
      .populate({
        path: "favourite.shoeId",
        model: "Shoe",
      })
      .exec();
    if (requested_account) {
      const compare = await bcrypt.compare(
        body.password,
        requested_account.password
      );
      if (compare) {
        const token = jsonwebtoken.sign(
          { id: requested_account._id },
          process.env.SECRET
        );
        res.cookie("token", token);
        res
          .status(200)
          .json({ success: true, data: requested_account, token: token });
      } else {
        res.status(400).json({
          error: "Login and Password aren't correct",
          success: false,
        });
      }
    } else {
      res
        .status(400)
        .json({ error: "Login and Password aren't correct", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};

const getuser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("fetching user");
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
    console.log("fetching user cart");
    const { id } = req.params;

    // Populate the shoeId field within the cart array
    const user = await User.findOne({ _id: id }).exec();
    const cart = await User.populate(user, {
      path: "cart.shoeId",
      model: "Shoe",
    });

    if (cart) {
      res.status(200).json({ cart: cart.cart, success: true });
    } else {
      res.status(400).json({ error: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal server error", success: false });
  }
};

const getUserFavourite = async (req, res) => {
  try {
    const { id } = req.params;

    // Populate the shoeId field within the cart array
    const fav = await User.findOne({ _id: id })
      .populate({
        path: "favourite.shoeId",
        model: "Shoe",
      })
      .exec();

    if (fav) {
      res.status(200).json({ favourite: fav.favourite, success: true });
    } else {
      res.status(400).json({ error: "User not found", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal server error", success: false });
  }
};
const addInCart = async (req, res) => {
  try {
    const { userId, shoe, color, size, quantity } = req.body;
    console.log(shoe);
    const cartItem = {
      shoe: shoe,
      color: color,
      size: size,
      quantity: quantity,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { cart: cartItem } },
      { new: true }
    );

    if (updatedUser) {
      await updatedUser.populate("cart.shoe");

      res.status(200).json({ data: updatedUser.cart, success: true });
    } else {
      console.log("User not found");
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, success: false });
  }
};

const addInFavourite = async (req, res) => {
  try {
    const { UserId, ShoeId } = req.body;
    const updated_user = await User.findOneAndUpdate(
      { _id: UserId },
      { $push: { favourite: { shoeId: ShoeId } } },
      { new: true }
    );
    if (updated_user) {
      console.log(updated_user);
      res.status(200).json({ updated_user, success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, success: false });
  }
};
const removeFromFavourite = async (req, res) => {
  try {
    const { UserId, ShoeId } = req.body;
    const updated_user = await User.findOneAndUpdate(
      { _id: UserId },
      { $pull: { favourite: { shoeId: ShoeId } } },
      { new: true }
    );
    if (updated_user) {
      console.log(updated_user);
      res.status(200).json({ updated_user, success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { userId, shoeId } = req.body;
    const updated_user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { shoe: shoeId } } },
      { new: true }
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
  addInFavourite,
  removeFromFavourite,
  removeFromCart,
};
