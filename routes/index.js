// Import necessary modules and controllers
import express from 'express';
import HomeController from '../controllers/home.controller.js';
import userRoutes from './user.routes.js'; // Import the user route
import studentRouter from './student.routes.js';
import interviewRouter from './interview.route.js'
import resultRouter from './result.routes.js'
import downloadRouter from './download.routes.js';
import isAuthenticated from '../middlewares/authentication.middleware.js';

// Create an Express router
const router = express.Router();
const homeController = new HomeController();

// Define routes

// Home route
router.get('/', homeController.renderHome);

// Dashboard route with authentication middleware
router.get('/dashboard', isAuthenticated, homeController.renderDashboard);

// User routes (imported from user.routes.js)
router.use('/users', userRoutes);

// Student routes (imported from student.routes.js)
router.use('/students', studentRouter);

// Interview routes (imported from interview.route.js)
router.use('/interview', interviewRouter);

// Result routes (imported from result.routes.js)
router.use('/result', resultRouter);


router.use('/download', downloadRouter);

// Export the router
export default router;
