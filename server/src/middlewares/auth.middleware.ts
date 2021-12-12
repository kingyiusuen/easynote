import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpException } from "../exceptions/HttpException";
import { User } from "../entities/User";
import { getRepository } from "typeorm";

const authMiddleware = async (
  req: Request<{}, {}, User>,
  _res: Response,
  next: NextFunction
) => {
  try {
    const Authorization =
      req.cookies["Authorization"] ||
      req.header("Authorization")!.split("Bearer ")[1] ||
      null;

    if (Authorization) {
      const secretKey = process.env.JWT_SECRET as string;
      const verificationResponse = jwt.verify(
        Authorization,
        secretKey
      ) as JwtPayload;
      const userId = verificationResponse.id;
      const userRepository = getRepository(User);
      const findUser = await userRepository.findOne({ id: userId });

      if (findUser) {
        req.body = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

export default authMiddleware;
