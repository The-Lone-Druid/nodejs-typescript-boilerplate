import { Request, Response, NextFunction } from 'express';

export interface PaginationParams {
    page: number;
    limit: number;
}

declare global {
    namespace Express {
        interface Request {
            pagination: PaginationParams;
        }
    }
}

const paginationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    req.pagination = {
        page: parsedPage,
        limit: parsedLimit
    };

    next();
};

export { paginationMiddleware };
