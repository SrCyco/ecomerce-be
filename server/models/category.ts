import mongoose from 'mongoose';
import { Models } from '../types/types';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryId: {
    type: Number,
    unique: true,
    required: [true, 'The id of the category is required'],
  },
  name: {
    type: String,
    unique: true,
    required: [true, 'The name of the category is required'],
  },
  description: {
    type: String,
    unique: true,
  },
});

export default mongoose.model(Models.Category, categorySchema);
