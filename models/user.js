import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    // required: true
  },
  pincode: {
    type: String,
    // required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true // ensure phone number is unique
  },
  state: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    required: true,
    default: false
  },
  points: {
    type: Number,
    default: 0,
    required: true
  }
}, {timestamps: true});

export default model('User', userSchema);