export enum Models {
  Category = 'Category',
  Place = 'Place',
  Profile = 'Profile',
  Account = 'Account',
}

export enum Roles {
  Admin = 'ADMIN_ROLE',
}

export interface CustomResponse<Type> {
  ok: boolean;
  body: Type;
}
