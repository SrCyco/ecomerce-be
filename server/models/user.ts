import mongoose from 'mongoose';
import { Models, User } from '../types/types';

const Schema = mongoose.Schema;

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  placeId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: true,
  },
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
  password: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    unique: true,
    required: false,
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
