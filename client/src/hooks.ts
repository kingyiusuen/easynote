import { useState } from "react";
import jwtDecode from "jwt-decode";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CustomJwtPayload,
  logout,
  setAuthToken,
  setCurrentUser,
} from "./actions/session.action";
import type { RootState } from "./store";
import { UrlParams } from "./types";

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRestoreSession = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("jwtToken");

  if (token) {
    // Restore session if token exists
    setAuthToken(token);
    const decoded = jwtDecode<CustomJwtPayload>(token);
    dispatch(setCurrentUser({ id: decoded.id, username: decoded.username }));

    // Logout if token has expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch(logout());
    }
  }
};

/* Get notebookId from URL */
export const useGetActiveNotebookId = () => {
  const params = useParams<keyof UrlParams>() as UrlParams;
  return params.notebookId;
};

/* Get notebook from URL */
export const useGetActiveNotebook = () => {
  const notebookId = useGetActiveNotebookId();
  return useReduxSelector((state) => {
    if (notebookId === "all") {
      return {
        id: "all",
        name: "All Notes",
        userId: "",
        createdAt: "",
        updatedAt: "",
        noteIds: state.note.ids,
      };
    } else {
      return state.notebook.entities[notebookId];
    }
  });
};

export const useToggleItem = (defaultValue = false): [boolean, () => void] => {
  const [isActive, setIsActive] = useState(defaultValue);
  const toggle = () => setIsActive(!isActive);

  return [isActive, toggle];
};
