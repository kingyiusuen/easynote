import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { UserCreateDto } from "../dtos/users.dto";
import { Routes } from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";

class AuthRoute implements Routes {
  public path = "";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(UserCreateDto, "body"),
      this.authController.signup
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(UserCreateDto, "body"),
      this.authController.login
    );
  }
}

export default AuthRoute;