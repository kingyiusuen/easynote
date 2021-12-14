import axios from "axios";
import { Dispatch } from "redux";
import { AppThunk } from "../store";
import { Note, NoteIdEntityMap, Notebook, NotebookIdEntityMap } from "../types";
import * as userService from "../services/users.service";
import * as notebookService from "../services/notebooks.service";

/* Action names */
export enum NOTEBOOK_ACTIONS {
  FETCH_USER_NOTEBOOKS = "FETCH_USER_NOTEBOOKS",
  CREATE_NOTEBOOK = "CREATE_NOTEBOOK",
  RENAME_NOTEBOOK = "RENAME_NOTEBOOK",
  REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK",
  SET_ACTIVE_NOTEBOOK_ID = "SET_ACTIVE_NOTEBOOK_ID",
}

/* Action types */
export type FetchUserNotebooksAction = {
  type: NOTEBOOK_ACTIONS.FETCH_USER_NOTEBOOKS;
  payload: {
    noteIdEntityMap: NoteIdEntityMap;
    notebookIdEntityMap: NotebookIdEntityMap;
    noteIds: string[];
    notebookIds: string[];
  };
};

export type SetActiveNotebookIdAction = {
  type: NOTEBOOK_ACTIONS.SET_ACTIVE_NOTEBOOK_ID;
  payload: string;
};

export type CreateNotebookAction = {
  type: NOTEBOOK_ACTIONS.CREATE_NOTEBOOK;
  payload: Notebook;
};

export type NotebookActionType =
  | FetchUserNotebooksAction
  | SetActiveNotebookIdAction
  | CreateNotebookAction;

/* Interfaces for data coming into action creators */
export interface NotebookCreateDto {
  userId: string;
  name: string;
}

export interface NotebookUpdateDto {
  name: string;
}

/* Interfaces for data received from server  */
export interface FetchUserNotebooksResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  notes: Note[];
}
[];

/* Action creators */
export const fetchUserNotebooks =
  (userId: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await userService.getUserNotebooks(userId);
      const unnormalizedNotebooks: FetchUserNotebooksResponse[] = response.data;
      const notebookIdEntityMap: NotebookIdEntityMap = {};
      const notebookIds: string[] = [];
      const noteIdEntityMap: NoteIdEntityMap = {};
      const noteIds: string[] = [];
      unnormalizedNotebooks.forEach((unnormalizedNotebook) => {
        const noteIdsForCurrentNotebook: string[] = [];
        unnormalizedNotebook.notes.forEach((note: Note) => {
          noteIdEntityMap[note.id] = note;
          noteIdsForCurrentNotebook.push(note.id);
        });
        noteIds.push(...noteIdsForCurrentNotebook);
        notebookIdEntityMap[unnormalizedNotebook.id] = {
          ...unnormalizedNotebook,
          noteIds: noteIdsForCurrentNotebook,
        };
        notebookIds.push(unnormalizedNotebook.id);
      });

      dispatch({
        type: NOTEBOOK_ACTIONS.FETCH_USER_NOTEBOOKS,
        payload: { notebookIdEntityMap, notebookIds, noteIdEntityMap, noteIds },
      });
    } catch (error) {
      console.log(error);
    }
  };

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

export const setActiveNotebookId = (notebookId: string) => ({
  type: NOTEBOOK_ACTIONS.SET_ACTIVE_NOTEBOOK_ID,
  payload: notebookId,
});
