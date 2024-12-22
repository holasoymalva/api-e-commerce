import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');

      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        errors: errorMessage
      });
    }

    next();
  };
};

// Custom validator for specific fields
export const validateField = (field: string, schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.body[field];
    const { error } = schema.validate(value);

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: `Invalid ${field}`,
        errors: error.details[0].message
      });
    }

    next();
  };
};

// Validate query parameters
export const validateQuery = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid query parameters',
        errors: error.details.map(detail => detail.message)
      });
    }

    next();
  };
};