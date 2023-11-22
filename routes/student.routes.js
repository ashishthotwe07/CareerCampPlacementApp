// Import necessary modules and controllers
import express from 'express';
import StudentController from '../controllers/students.controller.js';
import passport from 'passport';
import isAuthenticated from '../middlewares/authentication.middleware.js';


// Create an Express router
const router = express.Router();
const studentController = new StudentController();

// Define routes for student operations

// Render form to add a new student
router.get('/add',isAuthenticated, studentController.renderStudentForm);

// Create a new student
router.post('/add',isAuthenticated, studentController.createStudent);

// Render form to edit an existing student
router.get('/edit/:id',isAuthenticated, studentController.renderEditForm);

// Update an existing student
router.post('/edit/:id',isAuthenticated, studentController.updateStudent);

// Delete a specific student
router.get('/delete/:id',isAuthenticated, studentController.deleteStudent);

// Export the router
export default router;
