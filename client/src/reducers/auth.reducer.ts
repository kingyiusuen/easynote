import {
  DataStoredInToken,
  SET_CURRENT_USER,
  SET_AUTH_ERROR_MESSAGE,
} from "../actions/auth.action";

interface ISetCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  payload: DataStoredInToken | null;
}

interface IsetAuthErrorMessageAction {
  type: typeof SET_AUTH_ERROR_MESSAGE;
  payload: string;
}

type IAction = ISetCurrentUserAction | IsetAuthErrorMessageAction;

interface Istate {
  isAuthenticated: boolean;
  user: DataStoredInToken | null;
  error: string;
}

const initialState = {
  isAuthenticated: false,
  user: null,
  error: "",
};

const authReducer = (state: Istate = initialState, action: IAction) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    case SET_AUTH_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
