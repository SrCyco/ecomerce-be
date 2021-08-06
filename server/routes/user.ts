import express, { Request } from 'express';
import User from '../models/user';
import { verifyToken } from '../middlewares/auth';
import { Document, NativeError } from 'mongoose';
import { User as UserType } from '../types/types';
import bcrypt from 'bcrypt';
import { findPlaceById } from './place';

const app = express();

app.get('/user', verifyToken, (req, res) => {
  const skip = req.query.skip;
  const limit = req.query.limit;

  const filter = { isActive: true };

  User.find(filter, 'name email role isActive')
    .skip(skip)
    .limit(limit)
    .exec((error: NativeError, users: Document<UserType>[]) => {
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }
      User.countDocuments(filter, (error, count) => {
        return res.json({
          ok: true,
          users,
          count,
        });
      });
    });
});

// TODO: Check the role of the user to insert new users

app.post('/user', async (req: Request<any, any, UserType>, res) => {
  const body = req.body;
  const {
    userId,
    placeId,
    name,
    lastname,
    password,
    address,
    phone,
    email,
    role,
    isActive,
  } = body;
  let findedPlaceId;
  try {
    findedPlaceId = await findPlaceById(placeId);
  } catch (error: any) {
    throw new Error(error);
  }

  const user = new User({
    userId,
    placeId: findedPlaceId,
    name,
    lastname,
    password: bcrypt.hashSync(password, 10),
    address,
    phone,
    email,
    role,
    isActive,
  });

  user.save((error: NativeError, savedUser: UserType) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }

    return res.json({
      ok: true,
      user: savedUser,
    });
  });
});

export default app;
