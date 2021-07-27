import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';

import User from '../models/user';
import { User as UserType } from '../types/types';
const app = express();

app.post('/login', (req, res) => {
  const body = req.body;
  const noMatchResponse = {
    ok: false,
    error: {
      message: 'Incorrect user or password',
    },
  };

  User.findOne({ email: body.email }, (error: Error, user: UserType) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error,
      });
    }

    if (!user) {
      return res.status(400).json(noMatchResponse);
    }

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(400).json(noMatchResponse);
    }

    const token = jwt.sign(
      {
        user,
      },
      '',
      { expiresIn: '48h' },
    );

    res.json({
      ok: true,
      user,
      token,
    });
  });
});