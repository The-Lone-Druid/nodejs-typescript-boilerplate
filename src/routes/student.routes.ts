import express from 'express';
import controller from '../controllers/student.controller';
import {
    Schemas,
    validateSchema
} from '../middleware/validateSchema.middleware';

const router = express.Router();

router.get('/', controller.getAllStudents);
router.get('/:id', controller.getStudentById);
router.post(
    '/',
    validateSchema(Schemas.student.create),
    controller.createStudent
);
router.put(
    '/:id',
    validateSchema(Schemas.student.update),
    controller.updateStudent
);
router.delete('/:id', controller.deleteStudent);

export = router;
