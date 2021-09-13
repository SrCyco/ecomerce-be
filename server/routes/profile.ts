import express, { Request } from 'express';
import { verifyToken } from '../middlewares/auth';
import { CallbackError, Document } from 'mongoose';
import profile, { Profile } from '../models/profile';
import { findPlaceById } from './place';

const app = express();

app.get(
  '/profile',
  verifyToken,
  (req: Request<any, any, any, any, { skip: number; limit: number }>, res) => {
    const skip = req.query.skip;
    const limit = req.query.limit;

    const filter = { isActive: true };

    profile
      .find(filter, 'name email role isActive')
      .skip(skip)
      .limit(limit)
      .exec((error: CallbackError, profiles: Document<Profile>[]) => {
        if (error) {
          return res.status(400).json({
            ok: false,
            error,
          });
        }
        profile.countDocuments(filter, (error, count) => {
          return res.json({
            ok: true,
            profiles,
            count,
          });
        });
      });
  },
);

// TODO: Check the role of the user to insert new users

app.post('/profile', async (req: Request<any, any, Profile>, res) => {
  const body = req.body;
  const { placeId, name, lastname, phone, picture, birthDate } = body;

  let findedPlaceId;
  try {
    findedPlaceId = await findPlaceById(placeId);
  } catch (error: any) {
    throw new Error(error);
  }

  const user = new profile({
    placeId: findedPlaceId,
    name,
    lastname,
    phone,
    picture,
    birthDate,
  });

  user.save((error: CallbackError, savedProfile: Profile) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }

    return res.json({
      ok: true,
      user: savedProfile,
    });
  });
});

export default app;
