import jwtDecode, { JwtPayload } from "jwt-decode";
import axios from "axios";
import { Dispatch } from "redux";
import * as authService from "../services/auth.service";
import * as userService from "../services/users.service";
import { NOTE_ACTIONS } from "./notes.action";
import { NOTEBOOK_ACTIONS } from "./notebooks.action";
import { AppThunk } from "../store";
import { Note, NotebookIdEntityMap, NoteIdEntityMap } from "../types";

/* Action names */
export enum AUTH_ACTIONS {
  SET_CURRENT_USER = "SET_CURRENT_USER",
  SET_AUTH_ERROR_MESSAGE = "SET_AUTH_ERROR_MESSAGE",
}

/* Action types */
export type SetCurrentUserAction = {
  type: AUTH_ACTIONS.SET_CURRENT_USER;
  payload: DataStoredInToken | null;
};

export type SetAuthErrorMessageAction = {
  type: AUTH_ACTIONS.SET_AUTH_ERROR_MESSAGE;
  payload: string;
};

export type AuthActionType = SetCurrentUserAction | SetAuthErrorMessageAction;

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const setCurrentUser = (
  user: { id: string; username: string } | null
) => ({
  type: AUTH_ACTIONS.SET_CURRENT_USER,
  payload: user,
});

export const setAuthErrorMessage = (message: string) => ({
  type: AUTH_ACTIONS.SET_AUTH_ERROR_MESSAGE,
  payload: message,
});

/* Interfaces for data coming into action creators */
export interface UsernamePassword {
  username: string;
  password: string;
}

export interface DataStoredInToken {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

export type CustomJwtPayload = JwtPayload & DataStoredInToken;

/* Interfaces for data received from server  */
export interface FetchUserNotebooksResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  notes: Note[];
}

/* Action creators */
export const signup =
  (userData: UsernamePassword): AppThunk =>
  async (dispatch) => {
    try {
      await authService.signup(userData);
      dispatch(login(userData));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        dispatch(setAuthErrorMessage(error.response.data.message));
      } else {
        dispatch(setAuthErrorMessage("Something went wrong"));
      }
    }
  };

export const login =
  (userData: UsernamePassword): AppThunk =>
  async (dispatch) => {
    try {
      const response = await authService.login(userData);
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode<CustomJwtPayload>(token);
      dispatch(setCurrentUser({ id: decoded.id, username: decoded.username }));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        dispatch(setAuthErrorMessage(error.response.data.message));
      } else {
        dispatch(setAuthErrorMessage("Something went wrong"));
      }
    }
  };

export const logout = (): AppThunk => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken("");
  dispatch(setCurrentUser(null));
};

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
        const { notes: _, ...rest } = unnormalizedNotebook;
        notebookIdEntityMap[unnormalizedNotebook.id] = {
          ...rest,
          noteIds: noteIdsForCurrentNotebook,
        };
        notebookIds.push(unnormalizedNotebook.id);
      });

      dispatch({
        type: NOTEBOOK_ACTIONS.INITIALIZE_NOTEBOOKS,
        payload: { ids: notebookIds, entities: notebookIdEntityMap },
      });
      dispatch({
        type: NOTE_ACTIONS.INITIALIZE_NOTES,
        payload: { ids: noteIds, entities: noteIdEntityMap },
      });
    } catch (error) {
      console.log(error);
    }
  };
