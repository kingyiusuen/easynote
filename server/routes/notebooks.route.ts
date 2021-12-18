import { Router } from "express";
import NotebooksController from "../controllers/notebooks.controller";
import { NotebookCreateDto, NotebookUpdateDto } from "../dtos/notebooks.dto";
import { Routes } from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";

class NotebooksRoute implements Routes {
  public path = "/notebooks";
  public router = Router();
  public notebooksController = new NotebooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notebooksController.getNotebooks);
    this.router.get(
      `${this.path}/:id`,
      this.notebooksController.getNotebookById
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(NotebookCreateDto, "body"),
      this.notebooksController.createNotebook
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(NotebookUpdateDto, "body", true),
      this.notebooksController.updateNotebook
    );
    this.router.delete(
      `${this.path}/:id`,
      this.notebooksController.deleteNotebook
    );
  }
}

export default NotebooksRoute;
