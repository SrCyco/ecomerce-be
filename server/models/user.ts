import mongoose from 'mongoose';
import { Models } from '../types/types';

export interface User {
  placeId: string;
  name: string;
  lastname: string;
  password: string;
  address?: string;
  phone: string;
  email: string;
  role?: string;
  isActive: boolean;
  googleLogin: boolean;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<User>({
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
  isActive: {
    type: Boolean,
    unique: true,
    required: true,
    default: true,
  },
  googleLogin: {
    type: Boolean,
    unique: true,
    required: false,
    default: false,
  },
});

export default mongoose.model(Models.User, userSchema);
