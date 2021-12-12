export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface Notebook {
  id: string;
  name: string;
  notes: Note[];
}
