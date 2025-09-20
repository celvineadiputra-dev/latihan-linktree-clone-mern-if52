import express from 'express';

import * as userProfileController from '../controller/userProfileController.js';

const web = express.Router();

web.get('/:username', userProfileController.publicProfile);

export default web;
