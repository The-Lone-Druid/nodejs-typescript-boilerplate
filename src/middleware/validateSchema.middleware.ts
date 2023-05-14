import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/logging';

export const validateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error: any) {
            Logging.error(error);
            res.status(400).json({ error: error.message });
        }
    };
};

export const Schemas = {
    student: {
        create: Joi.object().keys({
            studentId: Joi.string().required(),
            studentQRCode: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().required(),
            grade: Joi.string().required(),
            address: {
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                zipCode: Joi.string().required()
            },
            contact: {
                email: Joi.string().required(),
                phone: Joi.string().required()
            }
        }),
        update: Joi.object().keys({
            studentId: Joi.string().required(),
            studentQRCode: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().required(),
            grade: Joi.string().required(),
            address: {
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                zipCode: Joi.string().required()
            },
            contact: {
                email: Joi.string().required(),
                phone: Joi.string().required()
            }
        })
    }
};
