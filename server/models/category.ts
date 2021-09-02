import mongoose from 'mongoose';
import { Models } from '../types/types';

export interface Category {
  name: string;
  description: string;
}

const Schema = mongoose.Schema;

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    unique: true,
    required: [true, 'The name of the category is required'],
  },
  description: {
    type: String,
    unique: true,
    required: false,
  },
});

export default mongoose.model<Category>(Models.Category, categorySchema);
