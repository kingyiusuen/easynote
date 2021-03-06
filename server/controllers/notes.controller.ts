import { NextFunction, Request, Response } from "express";
import { Repository, getRepository } from "typeorm";
import { Note } from "../entities/Note";
import { NoteCreateDto, NoteMoveDto, NoteUpdateDto } from "../dtos/notes.dto";
import { HttpException } from "../exceptions/HttpException";

class NotesController {
  private noteRepository: Repository<Note>;

  constructor() {
    this.noteRepository = getRepository(Note);
  }

  public getNotes = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const findAllNotesData: Note[] = await this.noteRepository.find();

      res.status(200).json(findAllNotesData);
    } catch (error) {
      next(error);
    }
  };

  public getNoteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteId = req.params.id;
      const findNote = await this.noteRepository.findOne({
        id: noteId,
      });
      if (!findNote)
        throw new HttpException(409, `Note does not exist (id: ${noteId})`);

      res.status(200).json(findNote);
    } catch (error) {
      next(error);
    }
  };

  public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteData = req.body as NoteCreateDto;

      const createNoteData = this.noteRepository.create({
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.noteRepository.save(createNoteData);

      res.status(201).json(createNoteData);
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteId = req.params.id;
      const noteData = req.body as NoteUpdateDto;
      const updateNoteData = await this.noteRepository
        .createQueryBuilder()
        .update(Note)
        .set({ ...noteData, updatedAt: new Date() })
        .where("id = :id", { id: noteId })
        .returning("*")
        .execute()
        .then((response) => response.raw[0]);

      res.status(200).json(updateNoteData);
    } catch (error) {
      next(error);
    }
  };

  public moveNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const noteId = req.params.id;
      const noteData = req.body as NoteMoveDto;
      const updateNoteData = await this.noteRepository
        .createQueryBuilder()
        .update(Note)
        .set(noteData)
        .where("id = :id", { id: noteId })
        .returning("*")
        .execute()
        .then((response) => response.raw[0]);

      res.status(200).json(updateNoteData);
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const noteId = req.params.id;
      const deleteNoteData = await this.noteRepository.delete(noteId);

      res.status(200).json(deleteNoteData);
    } catch (error) {
      next(error);
    }
  };
}

export default NotesController;
