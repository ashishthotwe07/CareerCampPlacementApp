// routes/index.js or routes/homeRoutes.js

import express from 'express';
import HomeController from '../controllers/home.controller.js';
import userRoutes from './user.routes.js'; // Import the user route

const router = express.Router();
const homeController = new HomeController();

router.get('/', homeController.renderHome);
router.use('/users', userRoutes);

export default router;
