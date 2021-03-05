/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';

import HttpException from '@/pkg/http_errors/HttpException';
import NotFoundError from '@/pkg/http_errors/NotFoundError';

const RouteErrorNotFound = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    throw new NotFoundError(`Route '${req.path}' was not found`);
};

const ErrorMiddleware = (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof HttpException) {
        return res.status(err.status).json({
            ...err,
            path: req.path,
        });
    }

    if (err.message) {
        return res.status(400).json({
            message: err.message,
            status: 400,
            error: 'Bad Request',
            causes: null,
            timestamp: new Date(),
            path: req.path,
        });
    }

    return res.status(500).json({
        message: 'Internal server error',
        status: 500,
        error: 'Internal Server Error',
        causes: null,
        timestamp: new Date(),
        path: req.path,
    });
};

export default ErrorMiddleware;
export { RouteErrorNotFound };
