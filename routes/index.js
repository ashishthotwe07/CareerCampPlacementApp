// routes/index.js or routes/homeRoutes.js

import express from 'express';
import HomeController from '../controllers/home.controller.js';
import userRoutes from './user.routes.js'; // Import the user route
import studentRouter from './student.routes.js';
import isAuthenticated from '../middlewares/authentication.middleware.js';


const router = express.Router();
const homeController = new HomeController();

router.get('/', homeController.renderHome);
router.get('/dashboard',isAuthenticated , homeController.renderDashboard);
router.use('/users', userRoutes);
router.use('/students',studentRouter);

export default router;
