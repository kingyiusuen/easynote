import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/HttpException";

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const Authorization = req?.header("Authorization")?.split("Bearer ")[1];

    if (Authorization && typeof Authorization === "string") {
      const secretKey = process.env.JWT_SECRET;
      jwt.verify(Authorization, secretKey);
      next();
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

export default authMiddleware;
