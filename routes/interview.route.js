// Import necessary modules and controllers
import express from 'express';
import InterviewController from '../controllers/interview.controller.js';

// Create an Express router
const router = express.Router();
const interviewController = new InterviewController();

// Define routes for interviews

// List all interviews
router.get('/', interviewController.listInterviews);

// Render form to add a new interview
router.get('/add', interviewController.renderAddInterviewForm);

// Create a new interview
router.post('/add', interviewController.createInterview);

// Render edit form for a specific interview
router.get('/edit/:id', interviewController.renderEditInterviewForm);

// Update an existing interview
router.post('/edit', interviewController.updateInterview);

// Delete a specific interview
router.get('/delete/:id', interviewController.deleteInterview);

// Render form to allocate students for a specific interview
router.get('/allocate/:id', interviewController.allocateStudents);

// Process student allocation for a specific interview
router.post('/allocate/:id', interviewController.processAllocation);

// Export the router
export default router;
