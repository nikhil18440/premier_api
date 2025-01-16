import { Schema, model } from 'mongoose';

const detailSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  phone: String,
  address: String,
  pincode: String,
  state: String

})
const orderSchema = new Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date,
    default: null
  },
  userId: {
    type: String,
    ref: 'User',
    // required: true
  },
  userDetails: {
    type: detailSchema,
    required: true
  },

  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  quantity: {
    type: Number,
    required: true
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
    },
    size: {
      type: String,
      enum: ['XS','S','M','L','XL','XXL'],
      required: true
    }
  }]
}, {timestamps:true});

export default model('Order', orderSchema);