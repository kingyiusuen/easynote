import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as userService from "../services/users.service";
import { UserReadNotebookDto } from "../dtos/users.dto";
import { ErrorResponse } from "../types";
import { NotebookReadDto } from "../dtos/notebooks.dto";

export const getNotebooks = createAsyncThunk<
  UserReadNotebookDto,
  string,
  { rejectValue: ErrorResponse }
>("note/getNotebooks", async (userId, { rejectWithValue }) => {
  try {
    const response = await userService.getUserNotebooks(userId);
    return response.data;
  } catch (err) {
    return rejectWithValue(err as ErrorResponse);
  }
});

interface IinitialState {
  notebooks: NotebookReadDto[];
}

const initialState: IinitialState = {
  notebooks: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotebooks.fulfilled, (state, action) => {
      state.notebooks = action.payload.notebooks;
    });
  },
});

export default noteSlice.reducer;
