import express from 'express';

import * as authController from '../controller/authController.js';
import * as userProfileController from "../controller/userProfileController.js"
import { protect } from '../middleware/authMiddleware.js';

const api = express.Router();

api.post('/register', authController.register);
api.post('/login', authController.login);

api.get('/me', protect, userProfileController.privateProfile);
api.put('/update_profile', protect, userProfileController.updateProfile)

export default api;
