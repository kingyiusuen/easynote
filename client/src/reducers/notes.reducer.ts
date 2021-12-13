import {
  CREATE_NOTEBOOK,
  FETCH_USER_NOTEBOOKS,
  SET_ACTIVE_NOTEBOOK_ID,
  SET_NOTES_ERROR_MESSAGE,
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
  payload: Notebook[];
}

interface ISetActiveNotebookIdAction {
  type: typeof SET_ACTIVE_NOTEBOOK_ID;
  payload: string;
}

interface ICreateNotebookAction {
  type: typeof CREATE_NOTEBOOK;
  payload: Notebook;
}

interface ISetNotesErrorMessage {
  type: typeof SET_NOTES_ERROR_MESSAGE;
  payload: string;
}

type IAction =
  | IFetchUserNotebooksAction
  | ISetActiveNotebookIdAction
  | ICreateNotebookAction
  | ISetNotesErrorMessage;

interface Istate {
  notebooks: Notebook[];
  activeNotebookId: string;
  activeNoteId: string | null;
  error: string;
}

const initialState: Istate = {
  notebooks: <Notebook[]>[],
  activeNotebookId: "all",
  activeNoteId: null,
  error: "",
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
    case CREATE_NOTEBOOK:
      return {
        ...state,
        notebooks: [...state.notebooks, action.payload],
        activeNotebookId: action.payload.id,
      };
    case SET_NOTES_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
