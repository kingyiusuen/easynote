import axios from "axios";
import { Dispatch } from "redux";
import * as noteService from "../services/notes.service";
import { AppThunk } from "../store";
import { Note, NoteIdEntityMap } from "../types";

/* Action names */
export enum NOTE_ACTIONS {
  INITIALIZE_NOTES = "INITIALIZE_NOTES",
  CREATE_NOTE = "CREATE_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
  MOVE_NOTE = "MOVE_NOTE",
  SET_ACTIVE_NOTE_ID = "SET_ACTIVE_NOTE_ID",
}

/* Action types */
export type InitializeNotesAction = {
  type: NOTE_ACTIONS.INITIALIZE_NOTES;
  payload: {
    ids: string[];
    entities: NoteIdEntityMap;
  };
};

export type CreateNoteAction = {
  type: NOTE_ACTIONS.CREATE_NOTE;
  payload: Note;
};

export type UpdateNoteAction = {
  type: NOTE_ACTIONS.UPDATE_NOTE;
  payload: Note;
};

export type DeleteNoteAction = {
  type: NOTE_ACTIONS.DELETE_NOTE;
  payload: {
    noteId: string;
    notebookId: string;
  };
};

export type MoveNoteAction = {
  type: NOTE_ACTIONS.MOVE_NOTE;
  payload: {
    noteId: string;
    currentNotebookId: string;
    targetNotebookId: string;
  };
};

export type SetActiveNoteId = {
  type: NOTE_ACTIONS.SET_ACTIVE_NOTE_ID;
  payload: {
    id: string;
  };
};

export type NoteActionType =
  | InitializeNotesAction
  | CreateNoteAction
  | UpdateNoteAction
  | DeleteNoteAction
  | MoveNoteAction
  | SetActiveNoteId;

/* Interfaces for data coming into action creators */
export interface NoteCreateDto {
  notebookId: string;
}

export interface NoteUpdateDto {
  title: string;
  content: string;
}

export interface NoteMoveDto {
  notebookId: string;
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
      dispatch({
        type: NOTE_ACTIONS.SET_ACTIVE_NOTE_ID,
        payload: { id: response.data.id },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const updateNote =
  (
    noteId: string,
    updateNoteData: NoteUpdateDto,
    setSyncStatus: React.Dispatch<React.SetStateAction<string>>
  ): AppThunk =>
  async (dispatch: Dispatch) => {
    setSyncStatus("Saving...");
    try {
      const response = await noteService.update(noteId, updateNoteData);
      dispatch({
        type: NOTE_ACTIONS.UPDATE_NOTE,
        payload: response.data,
      });
      setTimeout(() => setSyncStatus("All changes saved"), 500);
    } catch (error) {
      setSyncStatus("Something went wrong");
      console.log(error);
    }
  };

export const deleteNote =
  (
    noteId: string,
    notebookId: string,
    callbackOnSuccess: () => void,
    callbackOnFailure: React.Dispatch<React.SetStateAction<string>>
  ): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      await noteService.remove(noteId);
      callbackOnSuccess();
      dispatch({
        type: NOTE_ACTIONS.DELETE_NOTE,
        payload: { noteId, notebookId },
      });
      dispatch(setActiveNoteId(""));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        callbackOnFailure(error.response.data.message);
      } else {
        callbackOnFailure("Something went wrong");
      }
    }
  };

export const moveNote =
  (
    noteId: string,
    currentNotebookId: string,
    targetNotebookId: string,
    callbackOnSuccess: () => void,
    callbackOnFailure: React.Dispatch<React.SetStateAction<string>>
  ): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      await noteService.move(noteId, { notebookId: targetNotebookId });
      callbackOnSuccess();
      dispatch({
        type: NOTE_ACTIONS.MOVE_NOTE,
        payload: {
          noteId,
          currentNotebookId,
          targetNotebookId,
        },
      });
      dispatch(setActiveNoteId(""));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        callbackOnFailure(error.response.data.message);
      } else {
        callbackOnFailure("Something went wrong");
      }
    }
  };

export const setActiveNoteId = (noteId: string) => ({
  type: NOTE_ACTIONS.SET_ACTIVE_NOTE_ID,
  payload: { id: noteId },
});
