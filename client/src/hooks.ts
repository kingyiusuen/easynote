import jwtDecode from "jwt-decode";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  CustomJwtPayload,
  logout,
  setAuthToken,
  setCurrentUser,
} from "./actions/auth.action";
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
