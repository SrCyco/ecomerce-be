import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { localDB } from './config/config';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbConnection = async () => {
  try {
    await mongoose.connect(localDB, {
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

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running in port 3000');
});
