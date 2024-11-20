import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  products: [{
    productId: {
      type: String,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }]
}, {timestamps:true});

export default model('Order', orderSchema);