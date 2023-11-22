// Import necessary modules and controllers
import express from 'express';
import ResultController from '../controllers/result.controller.js';
import isAuthenticated from '../middlewares/authentication.middleware.js';

// Create an Express router
const router = express.Router();
const resultController = new ResultController();

// Define routes for results

// Route to show students allocated to a specific interview and mark their results
router.get('/interview/:id/results',isAuthenticated, resultController.showResultsPage);

// Route to update a student's result
router.post('/update',isAuthenticated, resultController.updateResult);

// Export the router
export default router;
