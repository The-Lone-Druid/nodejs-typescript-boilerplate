import Joi from 'joi';
import { UserRole } from './user.model';

const userSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'Last name is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Invalid email format'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    }),
    role: Joi.string()
        .valid(...Object.values(UserRole))
        .required()
        .messages({
            'any.required': 'Role is required',
            'any.only': 'Invalid role'
        })
});

export default userSchema;
