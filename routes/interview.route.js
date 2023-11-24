// Import necessary modules and controllers
import express from 'express';
import InterviewController from '../controllers/interview.controller.js';

// Create an Express router
const router = express.Router();
const interviewController = new InterviewController();
import isAuthenticated from '../middlewares/authentication.middleware.js';

// Define routes for interviews

// List all interviews
router.get('/',isAuthenticated, interviewController.listInterviews);

// Render form to add a new interview
router.get('/add',isAuthenticated, interviewController.renderAddInterviewForm);

// Create a new interview
router.post('/add', isAuthenticated,interviewController.createInterview);

// Render edit form for a specific interview
router.get('/edit/:id',isAuthenticated, interviewController.renderEditInterviewForm);

// Update an existing interview
router.post('/edit', isAuthenticated,interviewController.updateInterview);

// Delete a specific interview
router.get('/delete/:id',isAuthenticated, interviewController.deleteInterview);

// Render form to allocate students for a specific interview
router.get('/allocate/:id',isAuthenticated, interviewController.allocateStudents);

// Process student allocation for a specific interview
router.post('/allocate/:id',isAuthenticated, interviewController.processAllocation);


router.post('/unallocate/:id', interviewController.processUnallocation);

// Export the router
export default router;
