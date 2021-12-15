import axios from "axios";
import { Dispatch } from "redux";
import { AppThunk } from "../store";
import { Notebook, NotebookIdEntityMap } from "../types";
import {
  CreateNoteAction,
  DeleteNoteAction,
  MoveNoteAction,
} from "./notes.action";
import * as notebookService from "../services/notebooks.service";

/* Action names */
export enum NOTEBOOK_ACTIONS {
  INITIALIZE_NOTEBOOKS = "INITIALIZE_NOTEBOOKS",
  CREATE_NOTEBOOK = "CREATE_NOTEBOOK",
  RENAME_NOTEBOOK = "RENAME_NOTEBOOK",
  DELETE_NOTEBOOK = "DELETE_NOTEBOOK",
}

/* Action types */
export type InitializeNotebooksAction = {
  type: NOTEBOOK_ACTIONS.INITIALIZE_NOTEBOOKS;
  payload: {
    ids: string[];
    entities: NotebookIdEntityMap;
  };
};

export type CreateNotebookAction = {
  type: NOTEBOOK_ACTIONS.CREATE_NOTEBOOK;
  payload: Notebook;
};

export type RenameNotebookAction = {
  type: NOTEBOOK_ACTIONS.RENAME_NOTEBOOK;
  payload: Notebook;
};

export type DeleteNotebookAction = {
  type: NOTEBOOK_ACTIONS.DELETE_NOTEBOOK;
  payload: {
    id: string;
  };
};

export type NotebookActionType =
  | CreateNoteAction
  | DeleteNoteAction
  | MoveNoteAction
  | InitializeNotebooksAction
  | CreateNotebookAction
  | RenameNotebookAction
  | DeleteNotebookAction;

/* Interfaces for data coming into action creators */
export interface NotebookCreateDto {
  userId: string;
  name: string;
}

export interface NotebookRenameDto {
  name: string;
}

/* Action creators */
export const createNotebook =
  (
    notebookData: NotebookCreateDto,
    callbackOnSuccess: () => void,
    callbackOnFailure: React.Dispatch<React.SetStateAction<string>>
  ): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await notebookService.create(notebookData);
      dispatch({
        type: NOTEBOOK_ACTIONS.CREATE_NOTEBOOK,
        payload: {
          ...response.data,
          notes: [],
        },
      });
      callbackOnSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        callbackOnFailure(error.response.data.message);
      } else {
        callbackOnFailure("Something went wrong");
      }
    }
  };

export const renameNotebook =
  (
    notebookId: string,
    notebookData: NotebookRenameDto,
    callbackOnSuccess: () => void,
    callbackOnFailure: React.Dispatch<React.SetStateAction<string>>
  ): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await notebookService.update(notebookId, notebookData);
      dispatch({
        type: NOTEBOOK_ACTIONS.RENAME_NOTEBOOK,
        payload: response.data,
      });
      callbackOnSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        callbackOnFailure(error.response.data.message);
      } else {
        callbackOnFailure("Something went wrong");
      }
    }
  };

export const deleteNotebook =
  (
    notebookId: string,
    callbackOnSuccess: () => void,
    callbackOnFailure: React.Dispatch<React.SetStateAction<string>>
  ): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      await notebookService.remove(notebookId);
      dispatch({
        type: NOTEBOOK_ACTIONS.DELETE_NOTEBOOK,
        payload: { id: notebookId },
      });
      callbackOnSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        callbackOnFailure(error.response.data.message);
      } else {
        callbackOnFailure("Something went wrong");
      }
    }
  };
