import { ErrorRequestHandler } from 'express';
import { statusCodes, CustomError } from './types';
import { Request, Response, NextFunction } from 'express';

const errorsHandler: ErrorRequestHandler = (
  err: CustomError, 
  _req: Request,
  res: Response,
  next: NextFunction
  ) => {
  const statusCode = err.statusCode || statusCodes.default;
  const message = statusCode === statusCodes.default
    ? 'Ошибка по умолчанию'
    : err.message;

  res.status(statusCode).send({
    statusCode,
    message,
  });

  next();
};

export { errorsHandler }
