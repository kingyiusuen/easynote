export interface Note {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  notebookId: string;
  content: string;
}

export interface Notebook {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  noteIds: string[];
}

export interface NoteIdEntityMap {
  [noteId: string]: Note;
}

export interface NotebookIdEntityMap {
  [notebookId: string]: Notebook;
}

export interface IParams {
  notebookId: string;
}
