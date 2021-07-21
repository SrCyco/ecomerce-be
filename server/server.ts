import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running in port 3000');
});
