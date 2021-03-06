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
  activeId: "",
};

const notebookReducer = (
  state: NotebookStore = initialState,
  action: NotebookActionType
): NotebookStore => {
  switch (action.type) {
    case NOTEBOOK_ACTIONS.INITIALIZE_NOTEBOOKS:
      return {
        ...state,
        ids: action.payload.ids,
        entities: action.payload.entities,
      };
    case NOTEBOOK_ACTIONS.CREATE_NOTEBOOK:
      return {
        ids: [...state.ids, action.payload.id],
        entities: {
          ...state.entities,
          [action.payload.id]: { ...action.payload, noteIds: [] },
        },
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
    case NOTE_ACTIONS.DELETE_NOTE: {
      const newNoteIdsList = state.entities[
        action.payload.notebookId
      ].noteIds.filter((id) => id !== action.payload.noteId);
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.notebookId]: {
            ...state.entities[action.payload.notebookId],
            noteIds: newNoteIdsList,
          },
        },
      };
    }
    case NOTE_ACTIONS.MOVE_NOTE: {
      const updatedCurrentNotebookNoteIds = state.entities[
        action.payload.currentNotebookId
      ].noteIds.filter((id) => id !== action.payload.noteId);
      const updatedTargetNotebookNoteIds = [
        action.payload.noteId,
        ...state.entities[action.payload.targetNotebookId].noteIds,
      ];
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.currentNotebookId]: {
            ...state.entities[action.payload.currentNotebookId],
            noteIds: updatedCurrentNotebookNoteIds,
          },
          [action.payload.targetNotebookId]: {
            ...state.entities[action.payload.targetNotebookId],
            noteIds: updatedTargetNotebookNoteIds,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default notebookReducer;
