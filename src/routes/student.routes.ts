import express from 'express';
import controller from '../controllers/student.controller';
import { Schemas, validate } from '../middleware/validation.middleware';

const router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.post('/', controller.createStudent);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

export default router;
