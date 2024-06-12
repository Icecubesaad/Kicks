const mongoose = require('mongoose');
const { Schema } = mongoose;

const shoesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Array,
    default: null
  },
  imageAmount: {
    type: String,
    default: 1
  },
  sizes: [
    {
      country: {
        type: String,
        required: true
      },
      availableSizes: [
        {
          sizes: {
            type: [Number],
            required: true
          },
          gender: {
            type: String,
            required: true
          }
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
  quantity: {
    type: Schema.Types.Number,
    required: true,
    default: 0
  },
  company: {
    type: Schema.Types.String,
    required: true
  }
});

const Shoe = mongoose.model('Shoe', shoesSchema);
module.exports = Shoe;
