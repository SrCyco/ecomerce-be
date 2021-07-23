import jwt from 'jsonwebtoken';
import express from 'express';

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.get('token') ?? '';

  jwt.verify(token, '', (error, decoded) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        error: {
          message: 'Invalid Token',
        },
      });
    }

    req.user = decoded.user;
    next();
  });
};
