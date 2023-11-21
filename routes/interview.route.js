// routes/interview.routes.js
import express from 'express';
import InterviewController from '../controllers/interview.controller.js';

const router = express.Router();
const interviewController = new InterviewController();

// List all interviews
router.get('/', interviewController.listInterviews);

// Render form to add a new interview
router.get('/add', interviewController.renderAddInterviewForm);

// Create a new interview
router.post('/add', interviewController.createInterview);

// Render edit form to add a new interview
router.get('/edit/:id', interviewController.renderEditInterviewForm);

// edit interview
router.post('/edit', interviewController.updateInterview);

// delete interview
router.get('/delete/:id', interviewController.deleteInterview);

// Render form to allocate students for a specific interview
router.get('/allocate/:id', interviewController.allocateStudents);
router.post('/allocate/:id', interviewController.processAllocation);



export default router;
