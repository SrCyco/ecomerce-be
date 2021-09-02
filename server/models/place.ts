import { Schema, model, Model, Document, PopulatedDoc } from 'mongoose';
import { Models } from '../types/types';

export enum PlaceType {
  Country = 'COUNTRY',
  Department = 'DEPARTMENT',
  City = 'CITY',
  Address = 'ADDRESS',
}

export interface Place {
  countryId?: PopulatedDoc<Place & Document>;
  departmentId?: PopulatedDoc<Place & Document>;
  cityId?: PopulatedDoc<Place & Document>;
  addressId?: PopulatedDoc<Place & Document>;
  type: PlaceType;
  description: string;
}

const placeSchema = new Schema<Place, Model<Place>, Place>({
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
  addressId: {
    type: Schema.Types.ObjectId,
    ref: Models.Place,
    required: false,
  },
  type: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: false,
  },
});

export default model(Models.Place, placeSchema);
