import { Router } from "express";
import NotesController from "../controllers/notes.controller";
import { NoteCreateDto, NoteUpdateDto } from "../dtos/notes.dto";
import { Routes } from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";

class NotesRoute implements Routes {
  public path = "/notes";
  public router = Router();
  public notesController = new NotesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notesController.getNotes);
    this.router.get(`${this.path}/:id`, this.notesController.getNoteById);
    this.router.post(
      `${this.path}`,
      validationMiddleware(NoteCreateDto, "body"),
      this.notesController.createNote
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(NoteUpdateDto, "body", true),
      this.notesController.updateNote
    );
    this.router.delete(`${this.path}/:id`, this.notesController.deleteNote);
  }
}

export default NotesRoute;
