import express from 'express';
import { APP_PORT } from './config/config.js';
import webRouter from './route/web.js';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(webRouter);

app.listen(APP_PORT, () => {
  console.log(`The app is running at http://localhost:${APP_PORT}`);
});
