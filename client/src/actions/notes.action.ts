import { Dispatch } from "redux";
import { NotebookCreateDto } from "../dtos/notebooks.dto";
import { AppThunk } from "../store";
import * as userService from "../services/users.service";
import * as notebookService from "../services/notebooks.service";

export const FETCH_USER_NOTEBOOKS = "FETCH_USER_NOTEBOOKS";
export const CREATE_NOTEBOOK = "CREATE_NOTEBOOK";
export const RENAME_NOTEBOOK = "RENAME_NOTEBOOK";
export const REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK";
export const SET_ACTIVE_NOTEBOOK_ID = "SET_ACTIVE_NOTEBOOK_ID";
export const CREATE_NOTE = "CREATE_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";

export const fetchUserNotebooks =
  (userId: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await userService.getUserNotebooks(userId);
      dispatch({
        type: FETCH_USER_NOTEBOOKS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const setActiveNotebookId = (notebookId: string) => ({
  type: SET_ACTIVE_NOTEBOOK_ID,
  payload: notebookId,
});

export const createNotebook =
  (notebookData: NotebookCreateDto): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await notebookService.create(notebookData);
      dispatch({
        type: CREATE_NOTEBOOK,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
