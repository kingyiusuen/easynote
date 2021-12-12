import { NextFunction, Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
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
}

export default UsersController;
