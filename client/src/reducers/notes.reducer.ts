import { NOTE_ACTIONS, NoteActionType } from "../actions/notes.action";
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
    case NOTE_ACTIONS.INITIALIZE_NOTES:
      return {
        ...state,
        ids: action.payload.ids,
        entities: action.payload.entities,
      };
    case NOTE_ACTIONS.CREATE_NOTE: {
      return {
        ids: [action.payload.id, ...state.ids],
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
    case NOTE_ACTIONS.DELETE_NOTE: {
      const { [action.payload.noteId]: _, ...rest } = state.entities;
      return {
        ids: state.ids.filter((id) => id !== action.payload.noteId),
        entities: rest,
        activeId: action.payload.nextNoteId,
      };
    }
    case NOTE_ACTIONS.MOVE_NOTE: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.noteId]: {
            ...state.entities[action.payload.noteId],
            notebookId: action.payload.targetNotebookId,
          },
        },
      };
    }
    case NOTE_ACTIONS.SET_ACTIVE_NOTE_ID: {
      return {
        ...state,
        activeId: action.payload.id,
      };
    }
    default:
      return state;
  }
};

export default noteReducer;
