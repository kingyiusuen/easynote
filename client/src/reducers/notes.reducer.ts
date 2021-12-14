import { NOTE_ACTIONS, NoteActionType } from "../actions/notes.action";
import { NOTEBOOK_ACTIONS } from "../actions/notebooks.action";
import { NoteIdEntityMap } from "../types";

interface NoteStore {
  ids: string[];
  entities: NoteIdEntityMap;
  activeId: string;
}

const initialState = {
  ids: [],
  entities: {},
  activeId: "",
};

const noteReducer = (
  state: NoteStore = initialState,
  action: NoteActionType
) => {
  switch (action.type) {
    case NOTEBOOK_ACTIONS.FETCH_USER_NOTEBOOKS:
      return {
        ...state,
        ids: action.payload.noteIds,
        entities: action.payload.noteIdEntityMap,
      };
    case NOTE_ACTIONS.CREATE_NOTE: {
      return {
        ids: [...state.ids, action.payload.id],
        entities: { ...state.entities, [action.payload.id]: action.payload },
        activeId: action.payload.id,
      };
    }
    case NOTE_ACTIONS.UPDATE_NOTE: {
      return {
        ...state,
        entities: { ...state.entities, [action.payload.id]: action.payload },
      };
    }
    case NOTE_ACTIONS.SET_ACTIVE_NOTE_ID:
      return {
        ...state,
        activeNoteId: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
