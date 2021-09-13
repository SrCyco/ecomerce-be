import { Schema, Model, model } from 'mongoose';
import { Models } from '../types/types';

export interface Account {
  email: string;
  password: string;
  isActive?: boolean;
  role: string;
  googleLogin?: boolean;
}

const accountSchema = new Schema<Account, Model<Account>, Account>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  isActive: {
    type: Boolean,
    unique: true,
    required: false,
    default: true,
  },
  role: {
    type: String,
    unique: true,
    required: true,
  },
  googleLogin: {
    type: Boolean,
    unique: true,
    required: false,
    default: false,
  },
});

export default model(Models.Account, accountSchema);
