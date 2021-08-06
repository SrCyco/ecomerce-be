import mongoose from 'mongoose';
export interface CategoryType {
  categoryId: number;
  name: string;
  description: string;
}

export enum Models {
  Category = 'Category',
  Place = 'Place',
  User = 'User',
}

export enum PlaceType {
  Country = 'COUNTRY',
  Department = 'DEPARTMENT',
  City = 'CITY',
}

export interface Place {
  _id: mongoose.ObjectId;
  placeId: string;
  countryId?: string;
  departmentId?: string;
  cityId?: string;
  type: PlaceType;
  name: string;
}

export interface User {
  userId: string;
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
