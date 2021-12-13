import { Dispatch } from "redux";
import { NotebookCreateDto } from "../dtos/notebooks.dto";
import { AppThunk } from "../store";
import * as userService from "../services/users.service";
import * as notebookService from "../services/notebooks.service";

export const NOTES_ACTIONS = {
  FETCH_USER_NOTEBOOKS: "FETCH_USER_NOTEBOOKS",
  CREATE_NOTEBOOK: "CREATE_NOTEBOOK",
  UPDATE_NOTEBOOK: "UPDATE_NOTEBOOK",
  REMOVE_NOTEBOOK: "REMOVE_NOTEBOOK",
  CREATE_NOTE: "CREATE_NOTE",
  REMOVE_NOTE: "REMOVE_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
};

export const fetchUserNotebooks =
  (userId: string): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await userService.getUserNotebooks(userId);
      dispatch({
        type: NOTES_ACTIONS.FETCH_USER_NOTEBOOKS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const createNotebook =
  (notebookData: NotebookCreateDto): AppThunk =>
  async (dispatch: Dispatch) => {
    try {
      const response = await notebookService.create(notebookData);
      dispatch({
        type: NOTES_ACTIONS.CREATE_NOTEBOOK,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
