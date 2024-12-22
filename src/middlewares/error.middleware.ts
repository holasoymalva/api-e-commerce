import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { NotFoundError, UnauthorizedError } from '../utils/response';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  if (error instanceof NotFoundError) {
    return res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({
      status: 'error',
      message: error.message,
    });
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: error.message,
    });
  }

  // Default error
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
