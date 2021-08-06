import express from 'express';

// routes
import category from './category';
import user from './user';
import place from './place';
import login from './login';

const app = express();

app.use(category);
app.use(user);
app.use(place);
app.use(login);

export default app;
