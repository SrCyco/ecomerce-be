export interface CategoryType {
  categoryId: number;
  name: string;
  description: string;
}

export enum Models {
  Category = 'Categoty',
  Place = 'Place',
  User = 'User',
}

export enum PlaceType {
  Country = 'COUNTRY',
  Department = 'DEPARTMENT',
  City = 'CITY',
  Direction = '',
}

export interface Place {
  placeId: string;
  countryId: string;
  departmentId: string;
  cityId: string;
  addressId: string;
  type: PlaceType;
  additionalInfo?: string;
}

export interface User {
  userId: string;
  placeId: Place;
  name: string;
  lastname: string;
  password: string;
  address?: string;
  phone: string;
  email: string;
  role?: string;
  active: boolean;
  googleLogin: boolean;
}
