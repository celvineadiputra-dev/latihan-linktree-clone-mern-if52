import express from 'express';

import * as userProfileController from '../controller/userProfileController.js';

const web = express.Router();

web.get('/:user_profile_id', userProfileController.userProfile);

export default web;
