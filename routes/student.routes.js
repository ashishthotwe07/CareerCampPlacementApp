import express from 'express';
import StudentController from '../controllers/students.controller.js';
import passport from 'passport';


const router = express.Router();
const studentController = new StudentController();

router.get('/add',studentController.renderStudentForm);
router.post('/add',studentController.createStudent);
router.get('/edit/:id', studentController.renderEditForm);
router.post('/edit/:id', studentController.updateStudent);
router.get('/delete/:id', studentController.deleteStudent);


  export default router;