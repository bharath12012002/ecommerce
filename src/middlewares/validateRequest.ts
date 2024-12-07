import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: error.details.map((detail) => detail.message).join(', '),
      });
      return; // Explicitly terminate middleware
    }
    next(); // Continue to the next middleware or handler
  };
};
