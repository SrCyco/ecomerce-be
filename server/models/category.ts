import { Schema, model } from 'mongoose';
import { Models } from '../types/types';

export interface Category {
  name: string;
  description: string;
}

const categorySchema = new Schema<Category>({
  name: {
    type: String,
    unique: true,
    required: [true, 'The name of the category is required'],
  },
  description: {
    type: String,
    required: false,
  },
});

export default model<Category>(Models.Category, categorySchema);
