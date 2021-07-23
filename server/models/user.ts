import mongoose from 'mongoose';
import { Models } from '../types/types';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  placeId: {},
  name: {
    type: String,
    unique: true,
    required: true,
  },
  lastname: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    unique: true,
    required: false,
  },
  active: {
    type: Boolean,
    unique: true,
    required: true,
    default: true,
  },
  googleLogin: {
    type: Boolean,
    unique: true,
    required: true,
  },
});

export default mongoose.model(Models.User, userSchema);
