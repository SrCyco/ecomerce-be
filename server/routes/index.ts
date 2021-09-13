import express from 'express';

// routes
import category from './category';
import profile from './profile';
import place from './place';
import login from './login';
import account from './account';

const app = express();

app.use(account);
app.use(profile);
app.use(place);
app.use(category);
app.use(login);

export default app;
