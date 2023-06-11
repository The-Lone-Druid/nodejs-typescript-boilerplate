import { Document, Schema, model } from 'mongoose';

export interface IStudent extends Document {
    studentId: string;
    studentQRCode: string;
    firstName: string;
    lastName: string;
    age: number;
    grade: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    contact: {
        email: string;
        phone: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
    {
        studentId: { type: String, required: true, unique: true },
        studentQRCode: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        age: { type: Number, required: true },
        grade: { type: String, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true }
        },
        contact: {
            email: { type: String, required: true },
            phone: { type: String, required: true }
        }
    },
    { timestamps: true }
);

const StudentModel = model<IStudent>('Student', StudentSchema);

export default StudentModel;
