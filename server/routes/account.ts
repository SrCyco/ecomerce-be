import express, { Request, Response } from 'express';
import account, { Account } from './../models/account';
import bcrypt from 'bcrypt';
import { CallbackError } from 'mongoose';
import { verifyRole, verifyToken } from '../middlewares/auth';
import { Roles } from '../types/types';

const app = express();

const findAccountByEmail = async (email: string): Promise<Account | null> => {
  try {
    return await account.findOne({ email });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const isOneAccountCreated = async (): Promise<boolean> => {
  try {
    const findedAccounts = await account.find({});
    console.log(findedAccounts);
    return findedAccounts.length > 0;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const isAdminAccount = async (email: string): Promise<boolean> => {
  const findedAccount = await findAccountByEmail(email);

  if (!findedAccount) {
    return false;
  }

  const { role } = findedAccount;
  return role === Roles.Admin;
};

app.post(
  '/register',
  verifyToken,
  async (req: Request<any, any, Account>, res: Response) => {
    const body = req.body;
    const { email, password, isActive, role, googleLogin } = body;

    const newAccount = new account({
      email,
      password: bcrypt.hashSync(password, 10),
      isActive,
      role,
      googleLogin,
    });

    newAccount.save((error: CallbackError, savedAccount: Account) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }

      return res.json({
        ok: true,
        user: savedAccount,
      });
    });
  },
);

export default app;
