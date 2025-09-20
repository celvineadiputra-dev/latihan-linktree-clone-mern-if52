import express from 'express';

import * as authController from '../controller/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const api = express.Router();

api.post('/register', authController.register);
api.post('/login', authController.login);

api.get('/me', protect, (req, res) => {
  res.status(200).json({
    message: 'User login',
    data: {
      user: req.user,
    },
  });
});

export default api;
