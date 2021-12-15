import React, { useEffect } from "react";
import styled from "styled-components";
import { HiOutlineFilter } from "react-icons/hi";
import { useDispatch } from "react-redux";
import Header from "./Header";
import NoteListItem from "./NoteListItem";
import NoNotesMessage from "./NoNotesMessage";
import { scrollable } from "../../styles/mixins";
import { useGetNotebook, useReduxSelector } from "../../hooks";
import { setActiveNoteId } from "../../actions/notes.action";
import { NoteIdEntityMap } from "../../types";

const sort = (notes: NoteIdEntityMap, noteIds: string[]) => {
  return noteIds
    ?.slice()
    .sort(
      (id1, id2) =>
        Date.parse(notes[id1].updatedAt) - Date.parse(notes[id2].updatedAt)
    )
    .reverse();
};

const NoteList = () => {
  // Get the list of note Ids for the selected notebook
  const notebook = useGetNotebook();

  // Sort the notes and set the first note as active
  const notes = useReduxSelector((state) => state.note.entities);
  const noteIds = notebook.noteIds;
  const sortedNoteIds = sort(notes, noteIds);
  const dispatch = useDispatch();
  useEffect(() => {
    const firstId = noteIds.length && noteIds[0];
    dispatch(setActiveNoteId(firstId || ""));
  }, [notebook]);

  const activeNoteId = useReduxSelector((state) => state.note.activeId);

  return (
    <Wrapper>
      <Header activeNotebookId={notebook.id} />
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
  background-color: var(--notelist-background);
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
