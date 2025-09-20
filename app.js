import express from 'express';
import passport from 'passport';
import { APP_PORT } from './config/config.js';
import { database } from './config/database.js';
import './config/passport.js';
import web from './route/web.js';
import api from './route/api.js';

const app = express();

app.use(express.json())

app.use(passport.initialize());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(web);
app.use("/api", api)

app.listen(APP_PORT, () => {
  database();
  console.log(`The app is running at http://localhost:${APP_PORT}`);
});
