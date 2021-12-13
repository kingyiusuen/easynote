import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";

const validationMiddleware = (
  type: ClassConstructor<unknown>,
  value: "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return async (req, _, next) => {
    try {
      const errors: ValidationError[] = await validate(
        plainToInstance(type, req[value]) as object,
        {
          skipMissingProperties,
          whitelist,
          forbidNonWhitelisted,
        }
      );
      if (errors.length > 0) {
        console.log(errors);
        const message = errors
          .map((error: ValidationError) => {
            if (error.constraints) {
              return Object.values(error.constraints).join(", ");
            } else {
              return "";
            }
          })
          .join(", ");
        next(new HttpException(400, message));
      } else {
        next();
      }
    } catch (error) {
      next(new HttpException(500, "Something went wrong"));
    }
  };
};

export default validationMiddleware;
