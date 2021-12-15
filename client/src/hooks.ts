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

export const useGetNotebookId = () => {
  const params = useParams();
  return params.notebookId || "all";
};

/* Get notebook based on URL */
export const useGetNotebook = () => {
  const notebookId = useGetNotebookId();

  if (notebookId === "all") {
    const noteIds = Array.prototype.concat(
      ...useReduxSelector((state) =>
        state.notebook.ids.map((id) => state.notebook.entities[id].noteIds)
      )
    );

    return {
      id: "all",
      name: "All Notes",
      noteIds,
    };
  }

  return useReduxSelector((state) => state.notebook.entities[notebookId]);
};
