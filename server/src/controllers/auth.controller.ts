import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserCreateDto } from "../dtos/users.dto";
import { DataStoredInToken } from "../interfaces/auth.interface";
import { HttpException } from "../exceptions/HttpException";

class AuthController {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserCreateDto = req.body;

      // Check if user already exists
      const findUser = await this.userRepository.findOne({
        username: userData.username,
      });
      if (findUser) throw new HttpException(409, "Username already exists");

      // Create password hash
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const signupUserData: User = this.userRepository.create({
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save user in database
      await this.userRepository.save(signupUserData);

      res.status(201).json(signupUserData);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserCreateDto = req.body;

      // Check if user exists
      const findUser = await this.userRepository.findOne({
        username: userData.username,
      });
      if (!findUser) throw new HttpException(409, "User does not exist");

      // Check if password matches
      const isPasswordMatching: boolean = await bcrypt.compare(
        userData.password,
        findUser.password
      );
      if (!isPasswordMatching)
        throw new HttpException(409, "Password not matching");

      // Create token
      const dataStoredInToken: DataStoredInToken = { id: findUser.id };
      const secretKey = process.env.JWT_SECRET!;
      const expiresIn = 60 * 60;
      const token = jwt.sign(dataStoredInToken, secretKey, { expiresIn });

      // Create cookie
      const cookie = `Authorization=${token}; HttpOnly; Max-Age=${expiresIn};`;

      res.setHeader("Set-Cookie", [cookie]);
      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (
    req: Request<{}, {}, User>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData = req.body;
      const findUser = await this.userRepository.findOne({
        username: userData.username,
        password: userData.password,
      });
      if (!findUser) throw new HttpException(409, "User does not exist");

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res.status(200).json(findUser);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
