import {
  DataStoredInToken,
  SET_CURRENT_USER,
  SET_LOGIN_SIGNUP_ERROR,
} from "../actions/auth.action";

interface ISetCurrentUserAction {
  type: typeof SET_CURRENT_USER;
  payload: {
    user: DataStoredInToken | null;
  };
}

interface ISetLoginSignupErrorAction {
  type: typeof SET_LOGIN_SIGNUP_ERROR;
  payload: {
    message: string;
  };
}

type IAction = ISetCurrentUserAction | ISetLoginSignupErrorAction;

interface Istate {
  isAuthenticated: boolean;
  user: DataStoredInToken | null;
  error: string;
}

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  error: "",
};

const authReducer = (state: Istate = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !action.payload.user,
        user: action.payload.user,
      };
    case SET_LOGIN_SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default authReducer;
