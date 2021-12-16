import { createContext } from "react";

type UIContextProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isNoteListOpen: boolean;
  toggleNoteList: () => void;
};

export const UIContext = createContext<Partial<UIContextProps>>({});
