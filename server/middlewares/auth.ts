import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config';
import { Account } from '../models/account';
import { isAdminAccount, isOneAccountCreated } from '../routes/account';
import { Roles } from '../types/types';

export const verifyToken = (
  req: Request<Account> & { account?: Account },
  res: Response,
  next: NextFunction,
): void => {
  const token = req.header('token') || '';
  console.log('token', token);

  jwt.verify(token, SECRET_KEY, (error, decoded = { account: {} }) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        error: {
          message: 'Invalid Token',
        },
      });
    }
    req.account = decoded.account;
    next();
  });
};

export const verifyRole = (
  req: Request<Account> & { account?: Account },
  res: Response,
  next: NextFunction,
): void | Response => {
  const { role } = req.account || {};

  if (role !== Roles.Admin) {
    return res.status(401).json({
      ok: false,
      body: {
        error: {
          message: 'Unauthotized',
        },
      },
    });
  }

  next();
};
