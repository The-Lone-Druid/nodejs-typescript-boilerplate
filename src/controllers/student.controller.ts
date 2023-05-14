import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { IStudent, StudentModel } from '../models/student.model';
import Logging from '../library/logging';

// GET /students
export const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const students: IStudent[] = await StudentModel.find();
        res.json({
            count: students.length,
            students
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// GET /students/:id
export const getStudentById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const studentId = req.params.id;
        if (!Types.ObjectId.isValid(studentId)) {
            res.status(400).json({ error: 'Invalid student ID' });
            return;
        }

        const student: IStudent | null = await StudentModel.findById(studentId);
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }

        res.json({
            student
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /students
export const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const studentData: IStudent = req.body;
        const studentExists = await StudentModel.findOne({
            email: studentData.contact.email
        });
        const studentIdExists = await StudentModel.findOne({
            studentId: studentData.studentId
        });

        if (studentExists || studentIdExists) {
            res.status(400).json({ error: 'Student already exists' });
            return;
        }

        const newStudent: IStudent = await StudentModel.create(studentData);
        res.status(201).json({
            message: 'Student created successfully',
            student: newStudent
        });
    } catch (error) {
        Logging.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT /students/:id
export const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const studentId = req.params.id;
        const studentData: IStudent = req.body;

        if (!Types.ObjectId.isValid(studentId)) {
            res.status(400).json({ error: 'Invalid student ID' });
            return;
        }

        const updatedStudent: IStudent | null =
            await StudentModel.findByIdAndUpdate(studentId, studentData, {
                new: true
            });

        if (!updatedStudent) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }

        res.json({
            message: 'Student updated successfully',
            student: updatedStudent
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /students/:id
export const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const studentId = req.params.id;
        if (!Types.ObjectId.isValid(studentId)) {
            res.status(400).json({ error: 'Invalid student ID' });
            return;
        }

        const deletedStudent: IStudent | null =
            await StudentModel.findByIdAndRemove(studentId);

        if (!deletedStudent) {
            res.status(404).json({ error: 'Student not found' });
            return;
        }

        res.json({
            message: 'Student deleted successfully',
            student: deletedStudent
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
