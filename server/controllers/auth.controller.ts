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
      const userData = req.body as UserCreateDto;

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

      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body as UserCreateDto;

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
      const dataStoredInToken: DataStoredInToken = {
        id: findUser.id,
        username: findUser.username,
      };
      const secretKey = process.env.JWT_SECRET;
      const expiresIn = 60 * 60 * 6;
      const token = jwt.sign(dataStoredInToken, secretKey, { expiresIn });

      const user = { id: findUser.id, username: findUser.username };
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
