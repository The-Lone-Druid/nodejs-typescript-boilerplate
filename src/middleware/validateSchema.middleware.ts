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

export const Schemas = {};
