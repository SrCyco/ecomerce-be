import express from 'express';

// routes
import category from './category';

const app = express();

app.use(category);

export default app;
