import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import rootReducer from "./reducers/root.reducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export default store;
