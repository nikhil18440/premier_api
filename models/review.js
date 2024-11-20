import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {timestamps:true});

export default model('Review', reviewSchema);