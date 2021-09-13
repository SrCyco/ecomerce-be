import { Roles } from '../types/types';
import accountModel, { Account } from '../models/account';
import { CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

export const accounts: Account[] = [
  {
    email: 'sergio.nino@globant.com',
    password: '1234',
    role: Roles.Admin,
  },
];

export const createAccounts = (accounts: Account[]): void => {
  accounts.forEach((account: Account) => {
    const { email, password, ...rest } = account;
    accountModel.findOne({ email }, (err: CallbackError, doc: Account) => {
      console.log(err);
      console.log('Admin user finded', doc.email);

      if (!doc) {
        accountModel.create(
          { email, password: bcrypt.hashSync(password, 10), ...rest },
          (err: CallbackError, account: Account) => {
            console.log(err);
            console.log('Admin account created!', account.email);
          },
        );
      }
    });
  });
};
