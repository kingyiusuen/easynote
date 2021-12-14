import { combineReducers } from "redux";

import sessionReducer from "./session.reducer";
import notebookReducer from "./notebooks.reducer";
import noteReducer from "./notes.reducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  notebook: notebookReducer,
  note: noteReducer,
});

export default rootReducer;
