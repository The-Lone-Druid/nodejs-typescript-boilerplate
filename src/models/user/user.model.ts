import { Document, Schema, model } from 'mongoose';

export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest'
}

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: 50
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            maxlength: 150,
            unique: true
        },
        password: {
            type: String,
            required: true,
            maxlength: 150
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(UserRole)
        }
    },
    { timestamps: true }
);

export const UserModel = model<IUser>('User', UserSchema);
