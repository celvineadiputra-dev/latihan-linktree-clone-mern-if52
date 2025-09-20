import express from 'express';

import * as userProfileController from '../controller/userProfileController.js';

const webRouter = express.Router();

webRouter.get('/:user_profile_id', userProfileController.userProfile);

export default webRouter;
