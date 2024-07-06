const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  image:{
    type:String,
    default:null
  },
  email: {
    type: Schema.Types.String,
    require: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Regular expression for validating email format
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    index: {unique: true, dropDups: true}
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
      shoe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
      },
      color:{
        type:String,
        required:true,
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
