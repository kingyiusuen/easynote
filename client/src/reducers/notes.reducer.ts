import {
  FETCH_USER_NOTEBOOKS,
  SET_ACTIVE_NOTEBOOK_ID,
} from "../actions/notes.action";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Notebook {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  notes: Note[];
}

interface IFetchUserNotebooksAction {
  type: typeof FETCH_USER_NOTEBOOKS;
  payload: Notebook[] | null;
}

interface ISetActiveNotebookIdAction {
  type: typeof SET_ACTIVE_NOTEBOOK_ID;
  payload: string;
}

type IAction = IFetchUserNotebooksAction | ISetActiveNotebookIdAction;

interface Istate {
  notebooks: Notebook[] | null;
  activeNotebookId: string;
  activeNoteId: string | null;
}

const initialState: Istate = {
  notebooks: null,
  activeNotebookId: "all",
  activeNoteId: null,
};

const notesReducer = (state: Istate = initialState, action: IAction) => {
  switch (action.type) {
    case FETCH_USER_NOTEBOOKS:
      return {
        ...state,
        notebooks: action.payload,
      };
    case SET_ACTIVE_NOTEBOOK_ID:
      return {
        ...state,
        activeNotebookId: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
