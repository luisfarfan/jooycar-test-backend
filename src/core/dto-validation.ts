import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';

const prettyError = (errors: ValidationError[]) => {
  return errors.map((error) => ({
    property: error.property,
    constraints: Object.values(error.constraints || {}).join(', '),
  }));
};
export function validatePostDto<T extends object>(Dto: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(Dto, req.body, {
      enableImplicitConversion: true,
    });

    const errors = await validate(dtoObj);
    if (errors.length > 0) {
      res.status(400).json(prettyError(errors));
    } else {
      req.body = dtoObj;
      next();
    }
  };
}

export function validateQueryDto<T extends object>(Dto: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = plainToInstance(Dto, req.query, {
      enableImplicitConversion: true,
    });

    const errors = await validate(queryObj);
    if (errors.length > 0) {
      res.status(400).json(prettyError(errors));
    } else {
      req.query = queryObj as unknown as ParsedQs;
      next();
    }
  };
}
