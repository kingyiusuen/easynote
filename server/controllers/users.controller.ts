import { NextFunction, Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { HttpException } from "../exceptions/HttpException";
import { User } from "../entities/User";

class UsersController {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public getUsers = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userRepository.find({
        relations: ["notebooks", "notebooks.notes"],
      });
      res.status(200).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public getUserNotebooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const findUser = await this.userRepository.findOne(userId, {
        relations: ["notebooks", "notebooks.notes"],
      });
      if (!findUser)
        throw new HttpException(409, `User does not exist (id: ${userId})`);

      res.status(200).json(findUser.notebooks);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
