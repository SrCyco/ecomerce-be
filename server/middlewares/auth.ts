import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import { User } from '../types/types';

const verifyToken = (req: Request<User>, res: Response, next: NextFunction) => {
  const token = req.get('token') ?? '';

  jwt.verify(token, '', (error, decoded = { user: '' }) => {
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

export default { verifyToken };
