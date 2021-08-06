import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../types/types';

export const verifyToken = (
  req: Request<User>,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.get('token') || '';

  jwt.verify(token, 'test', (error, decoded = { user: '' }) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        error: {
          message: 'Invalid Token',
        },
      });
    }

    req.body.user = decoded.user;
    next();
  });
};
