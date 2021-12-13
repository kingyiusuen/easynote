import { NOTES_ACTIONS } from "../actions/notes.action";

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

interface IAction {
  type: typeof NOTES_ACTIONS.FETCH_USER_NOTEBOOKS;
  payload: Notebook[] | null;
}

interface Istate {
  notebooks: Notebook[] | null;
  activeNotebookId: null;
  activeNoteId: null;
}

const initialState = {
  notebooks: null,
  activeNotebookId: null,
  activeNoteId: null,
};

const notesReducer = (state: Istate = initialState, action: IAction) => {
  switch (action.type) {
    case NOTES_ACTIONS.FETCH_USER_NOTEBOOKS:
      return {
        ...state,
        notebooks: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
