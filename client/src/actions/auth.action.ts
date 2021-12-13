import jwtDecode, { JwtPayload } from "jwt-decode";
import axios from "axios";
import * as authService from "../services/auth.service";
import { AppThunk } from "../store";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_AUTH_ERROR_MESSAGE = "SET_AUTH_ERROR_MESSAGE";

export interface DataStoredInToken {
  id: string;
  username: string;
}

export interface UsernamePassword {
  username: string;
  password: string;
}

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const setCurrentUser = (user: DataStoredInToken | null) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setAuthErrorMessage = (message: string) => ({
  type: SET_AUTH_ERROR_MESSAGE,
  payload: message,
});

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
      const decoded = jwtDecode<JwtPayload & DataStoredInToken>(token);
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
