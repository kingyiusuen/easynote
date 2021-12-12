import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserCreateDto, UserReadDto } from "../dtos/users.dto";
import * as userService from "../services/users.service";

export const login = createAsyncThunk(
  "session/login",
  async (userData: UserCreateDto, { rejectWithValue }) => {
    try {
      const response = await userService.login(userData);
      return response.data;
    } catch (err) {
      if (err instanceof userService.ErrorResponse) {
        return rejectWithValue(err);
      } else {
        return rejectWithValue("Something went wrong");
      }
    }
  }
);

export const signup = createAsyncThunk(
  "session/signup",
  async (userData: UserCreateDto, { dispatch }) => {
    try {
      await userService.signup(userData);
      return dispatch(login(userData));
    } catch (err) {
      console.log(err);
      //return rejectWithValue(err.response.data);
    }
  }
);

interface sessionState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserReadDto | null;
  error: string;
}

const initialState: sessionState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: "",
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout(state, _) {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, _action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, _action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        //state.error = action.payload;
      })
      .addCase(signup.pending, (state, _action) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, _action) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(signup.rejected, (state, _action) => {
        state.isLoading = false;
        //state.error = action.payload;
      });
  },
});

export const { logout } = sessionSlice.actions;

export default sessionSlice.reducer;
