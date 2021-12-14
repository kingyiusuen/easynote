import {
  NOTEBOOK_ACTIONS,
  NotebookActionType,
} from "../actions/notebooks.action";
import { NOTE_ACTIONS } from "../actions/notes.action";
import { NotebookIdEntityMap } from "../types";

interface NotebookStore {
  ids: string[];
  entities: NotebookIdEntityMap;
  activeId: string;
}

const initialState = {
  ids: [],
  entities: {},
  activeId: "all",
};

const notebookReducer = (
  state: NotebookStore = initialState,
  action: NotebookActionType
) => {
  switch (action.type) {
    case NOTEBOOK_ACTIONS.FETCH_USER_NOTEBOOKS:
      return {
        ...state,
        ids: action.payload.notebookIds,
        entities: action.payload.notebookIdEntityMap,
      };
    case NOTEBOOK_ACTIONS.SET_ACTIVE_NOTEBOOK_ID:
      return {
        ...state,
        activeId: action.payload,
      };
    case NOTEBOOK_ACTIONS.CREATE_NOTEBOOK:
      return {
        ids: [...state.ids, action.payload.id],
        entities: { ...state.entities, [action.payload.id]: action.payload },
        activeId: action.payload.id,
      };
    case NOTEBOOK_ACTIONS.RENAME_NOTEBOOK:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...state.entities[action.payload.id],
            name: action.payload.name,
            updatedAt: action.payload.updatedAt,
          },
        },
      };
    case NOTEBOOK_ACTIONS.DELETE_NOTEBOOK: {
      const { [action.payload.id]: _, ...rest } = state.entities;
      return {
        ids: state.ids.filter((id) => id !== action.payload.id),
        entities: rest,
        activeId: "all",
      };
    }
    case NOTE_ACTIONS.CREATE_NOTE:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.notebookId]: {
            ...state.entities[action.payload.notebookId],
            noteIds: [
              ...state.entities[action.payload.notebookId].noteIds,
              action.payload.id,
            ],
          },
        },
      };
    default:
      return state;
  }
};

export default notebookReducer;
