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
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: true,
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: true,
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: true,
  },
  type: {
    type: String,
    unique: true,
    required: true,
  },
  additionalInfo: {
    type: String,
    unique: true,
    required: false,
  },
});

export default mongoose.model(Models.Place, placeSchema);
