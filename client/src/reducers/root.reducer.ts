import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import notebookReducer from "./notebooks.reducer";
import noteReducer from "./notes.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  notebook: notebookReducer,
  note: noteReducer,
});

export default rootReducer;
