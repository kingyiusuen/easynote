import { NextFunction, Request, Response } from "express";
import { Repository, getRepository } from "typeorm";
import { Notebook } from "../entities/Notebook";
import { NotebookCreateDto, NotebookUpdateDto } from "../dtos/notebooks.dto";
import { HttpException } from "../exceptions/HttpException";

class NotebooksController {
  private notebookRepository: Repository<Notebook>;

  constructor() {
    this.notebookRepository = getRepository(Notebook);
  }

  public getNotebooks = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllNotebooksData: Notebook[] =
        await this.notebookRepository.find();

      res.status(200).json(findAllNotebooksData);
    } catch (error) {
      next(error);
    }
  };

  public getNotebookById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notebookId = req.params.id;
      const findNotebook = await this.notebookRepository.findOne(notebookId);
      if (!findNotebook)
        throw new HttpException(
          409,
          `Notebook does not exist (id: ${notebookId})`
        );

      res.status(200).json(findNotebook);
    } catch (error) {
      next(error);
    }
  };

  public createNotebook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notebookData = req.body as NotebookCreateDto;
      const findNotebook = await this.notebookRepository.findOne(notebookData);
      if (findNotebook)
        throw new HttpException(
          409,
          `Notebook already exists (name: ${notebookData.name})`
        );

      const createNotebookData = this.notebookRepository.create({
        ...notebookData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.notebookRepository.save(createNotebookData);

      res.status(201).json(createNotebookData);
    } catch (error) {
      next(error);
    }
  };

  public updateNotebook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notebookId = req.params.id;
      const notebookData = req.body as NotebookUpdateDto;
      const updateNotebookData = await this.notebookRepository.update(
        notebookId,
        { ...notebookData, updatedAt: new Date() }
      );

      res.status(200).json(updateNotebookData);
    } catch (error) {
      next(error);
    }
  };

  public deleteNotebook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notebookId = req.params.id;
      const deleteNotebookData = await this.notebookRepository.delete(
        notebookId
      );

      res.status(200).json(deleteNotebookData);
    } catch (error) {
      next(error);
    }
  };
}

export default NotebooksController;
