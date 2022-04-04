import { NextFunction, Request, Response } from 'express';
import { ErrorList, ErrorMsgs } from './errors-list';
import { GeneralError } from './general-error';

/**
 * Prints error in console
 */
export const ErrorLoggerMiddleware = (err: GeneralError, _req: Request, _res: Response, next: NextFunction) => {
    console.error('⛔ \x1b[31m', err.toString());
    next(err);
};

/**
 * Generates the Error response to the client
 */
// FIXME: remove disable because _next function is needed on express for error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ClientErrorHandler = (err: GeneralError, _req: Request, res: Response, _next: NextFunction) => {
    const error: GeneralError =
        err.status !== undefined ? err : new GeneralError(500, ErrorList.GENERAL_ERROR, ErrorMsgs.GENERAL_ERROR);
    res
        .status(error.status)
        .json(error.toObject());
};