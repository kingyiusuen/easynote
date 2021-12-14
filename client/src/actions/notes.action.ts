import { Dispatch } from "redux";
import * as noteService from "../services/notes.service";
import { AppThunk } from "../store";
import { FetchUserNotebooksAction } from "./notebooks.action";
import { Note } from "../types";

/* Action names */
export enum NOTE_ACTIONS {
  CREATE_NOTE = "CREATE_NOTE",
  REMOVE_NOTE = "REMOVE_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  SET_ACTIVE_NOTE_ID = "SET_ACTIVE_NOTE_ID",
}

/* Action types */
type CreateNoteAction = {
  type: NOTE_ACTIONS.CREATE_NOTE;
  payload: Note;
};

type UpdateNoteAction = {
  type: NOTE_ACTIONS.UPDATE_NOTE;
  payload: Note;
};

type SetActiveNoteId = {
  type: NOTE_ACTIONS.SET_ACTIVE_NOTE_ID;
  payload: string;
};

export type NoteActionType =
  | FetchUserNotebooksAction
  | CreateNoteAction
  | UpdateNoteAction
  | SetActiveNoteId;

/* Interfaces for data coming into action creators */
export interface NoteCreateDto {
  notebookId: string;
}

export interface NoteUpdateDto {
  title: string;
  content: string;
}

/* Action creators */
export const createNote =
  (notebookId: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await noteService.create({ notebookId });
      dispatch({
        type: NOTE_ACTIONS.CREATE_NOTE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateNote =
  (noteId: string, updateNoteData: NoteUpdateDto): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await noteService.update(noteId, updateNoteData);
      dispatch({
        type: NOTE_ACTIONS.UPDATE_NOTE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const setActiveNoteId = (noteId: string) => ({
  type: NOTE_ACTIONS.SET_ACTIVE_NOTE_ID,
  payload: noteId,
});
