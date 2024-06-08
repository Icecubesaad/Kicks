const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image:{
    type:String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferredPaymentMethods: [
    {
      type: String,
    },
  ],
  cart: [
    {
      shoeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  favourite: [
    {
      shoeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", usersSchema);
module.exports = User;
