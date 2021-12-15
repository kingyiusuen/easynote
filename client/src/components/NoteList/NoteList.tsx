import React, { useEffect } from "react";
import styled from "styled-components";
import { HiOutlineFilter } from "react-icons/hi";
import Header from "./Header";
import NoteListItem from "./NoteListItem";
import NoNotesMessage from "./NoNotesMessage";
import { scrollable } from "../../styles/mixins";
import { useReduxSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { setActiveNoteId } from "../../actions/notes.action";

const NoteList = () => {
  // Get the list of note Ids for the selected notebook
  const activeNotebookId = useReduxSelector((state) => state.notebook.activeId);
  let noteIds: string[];
  if (activeNotebookId === "all") {
    const listsOfNoteIds = useReduxSelector((state) =>
      state.notebook.ids.map((id) => state.notebook.entities[id].noteIds)
    );
    noteIds = Array.prototype.concat(...listsOfNoteIds);
  } else {
    noteIds = useReduxSelector(
      (state) => state.notebook.entities[activeNotebookId]?.noteIds
    );
  }

  // If no active note, set the first note as active
  const activeNoteId = useReduxSelector((state) => state.note.activeId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!activeNoteId) {
      dispatch(
        setActiveNoteId(
          (noteIds && noteIds.length && noteIds[noteIds.length - 1]) || ""
        )
      );
    }
  });

  const notes = useReduxSelector((state) => state.note.entities);

  const sortedNoteIds = noteIds
    ?.slice()
    .sort(
      (id1, id2) =>
        Date.parse(notes[id1].updatedAt) - Date.parse(notes[id2].updatedAt)
    )
    .reverse();

  return (
    <Wrapper>
      <Header activeNotebookId={activeNotebookId} />
      <SearchBarWrapper>
        <SearchBar>
          <HiOutlineFilter />
          <Input type="text" placeholder="Filter" />
        </SearchBar>
      </SearchBarWrapper>
      {sortedNoteIds?.length ? (
        <List>
          {sortedNoteIds &&
            sortedNoteIds.map((id) => (
              <NoteListItem
                key={id}
                note={notes[id]}
                $active={activeNoteId === id}
              />
            ))}
        </List>
      ) : (
        <NoNotesMessage />
      )}
    </Wrapper>
  );
};

export default NoteList;

const Wrapper = styled.div`
  user-select: none;
  color: #282a2c;
  background-color: #f5f5f4;
`;

const SearchBarWrapper = styled.div`
  padding: 0 16px;
  height: 50px;
`;

const SearchBar = styled.div`
  padding: 4px;
  display: flex;
  background-color: white;
  border-radius: 4px;

  & > svg {
    font-size: 22px;
    color: #c4c5c6;
    margin: 4px 8px;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;
  color: #a2a3a3;

  &:focus {
    outline: none;
  }
`;

const List = styled.div`
  ${scrollable};
  height: calc(100vh - 54px - 50px);
`;
