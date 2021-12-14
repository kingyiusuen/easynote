import {
  DataStoredInToken,
  AuthActionType,
  AUTH_ACTIONS,
} from "../actions/auth.action";

interface AuthStore {
  isAuthenticated: boolean;
  user: DataStoredInToken | null;
  error: string;
}

const initialState = {
  isAuthenticated: false,
  user: null,
  error: "",
};

const authReducer = (
  state: AuthStore = initialState,
  action: AuthActionType
) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    case AUTH_ACTIONS.SET_AUTH_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
