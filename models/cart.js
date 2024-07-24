const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  products: [{
    productId: {
      type: String,
      ref: 'Product',
      required: true
    },
    size: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  total: {
    type: Number,
    required: true
  }
}, {timestamps:true});

module.exports = mongoose.model('Cart', cartSchema);