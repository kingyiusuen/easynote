import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import notesReducer from "./notes.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});

export default rootReducer;
