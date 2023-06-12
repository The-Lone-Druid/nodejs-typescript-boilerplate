import { Request, Response, NextFunction } from 'express';
import { UserSchema } from '../models';

const validateUser = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { error } = UserSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        res.status(400).json({ error: errorMessages });
        return;
    }
    next();
};

export { validateUser };
