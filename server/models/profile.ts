import { Schema, Model, model, PopulatedDoc, Document } from 'mongoose';
import { Models } from '../types/types';
import { Place } from './place';

export interface Profile {
  placeId: PopulatedDoc<Place & Document>;
  name: string;
  lastname: string;
  phone: string;
  picture?: string;
  birthDate?: string;
}

const profileSchema = new Schema<Profile, Model<Profile>, Profile>({
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
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  picture: {
    type: String,
    unique: true,
    requred: false,
  },
  birthDate: {
    type: String,
    unique: true,
    requred: false,
  },
});

export default model(Models.Profile, profileSchema);
