import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    enum: ['polo','oversize'],
  }
}, {timestamps:true});

export default model('Product', productSchema);