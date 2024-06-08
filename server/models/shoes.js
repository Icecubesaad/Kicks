const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: [
    {
        image:{
            type: String,
            required: true
        },
        color:{
            type:String,
        }
    }
  ],
  imageAmount:{
    type:String,
    default:1
  },
  sizes: [
    {
      country: {
        type: String,
        required: true
      },
      availableSizes: [
        {
          type: Number,
          required: true
        }
      ]
    }
  ],
  prices: [
    {
      currency: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  quantity:{
    type:Schema.Types.Number,
    required:true,
    default:0
  }
});

const Shoe = mongoose.model('Shoe', shoesSchema);
module.exports = Shoe
