import jwt from 'jsonwebtoken';
import { APP_SECRET_KEY } from '../config/config.js';

export const jwtSignUtil = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
  };

  const expiresIn = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, APP_SECRET_KEY, expiresIn);
};
