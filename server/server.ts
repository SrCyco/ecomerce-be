import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { ATLAS_DB } from './config/config';
import routes from './routes';
import { createAccounts, accounts } from './boot/seed';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes config

app.use(routes);

const dbConnection = async () => {
  try {
    await mongoose.connect(ATLAS_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

dbConnection()
  .then((result) => {
    console.log('Database created');
  })
  .catch((error) => {
    throw error;
  });

createAccounts(accounts);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running in port 3000');
});
