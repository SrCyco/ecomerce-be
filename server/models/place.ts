import mongoose from 'mongoose';
import { Models, Place } from '../types/types';

const Schema = mongoose.Schema;

const placeSchema = new Schema<Place>({
  placeId: {
    type: String,
    unique: true,
    required: true,
  },
  countryId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: false,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: false,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: false,
  },
  type: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: false,
  },
});

export default mongoose.model(Models.Place, placeSchema);
