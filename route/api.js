import express from 'express';

import * as authController from '../controller/authController.js';
import * as userProfileController from '../controller/profileController.js';
import * as linkController from '../controller/linkController.js'

import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { storage } from '../config/storage.js';

const upload = multer({storage})

const api = express.Router();

api.post('/register', authController.register);
api.post('/login', authController.login);

api.get('/me', protect, userProfileController.privateProfile);
api.put('/update_profile', protect, userProfileController.updateProfile);
api.put('/update_profile_file', protect, upload.single('profilePicture'), userProfileController.updateProfileImage);

api.post('/addLink', protect, linkController.addNewLink)
api.post('/remove/:id', protect, linkController.removeLink)

export default api;
