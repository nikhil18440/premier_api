import mongoose from 'mongoose';

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

export default mongoose.model('Cart', cartSchema);