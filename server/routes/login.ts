import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';

import account, { Account } from '../models/account';
import { SECRET_KEY } from '../config/config';

const app = express();

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const noMatchResponse = {
    ok: false,
    error: {
      message: 'Incorrect user or password',
    },
  };

  account.findOne({ email }, (error: Error, findedAccount: Account) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error,
      });
    }

    if (!findedAccount) {
      return res.status(400).json(noMatchResponse);
    }

    if (!bcrypt.compareSync(password, findedAccount.password)) {
      return res.status(400).json(noMatchResponse);
    }

    const token = jwt.sign(
      {
        account: findedAccount,
      },
      SECRET_KEY,
      { expiresIn: '48h' },
    );

    res.json({
      ok: true,
      account: findedAccount,
      token,
    });
  });
});

export default app;
