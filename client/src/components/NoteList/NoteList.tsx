import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Header from "./Header";
import NoteListItem from "./NoteListItem";
import NoNotesMessage from "./NoNotesMessage";
import { scrollable } from "../../styles/mixins";
import { useGetActiveNotebook, useReduxSelector } from "../../hooks";
import { setActiveNoteId } from "../../actions/notes.action";
import { UIContext } from "../../contexts";
import { NoteIdEntityMap } from "../../types";

const sort = (notes: NoteIdEntityMap, noteIds: string[]) => {
  return noteIds
    ? noteIds
        .slice()
        .sort(
          (id1, id2) =>
            Date.parse(notes[id2].updatedAt) - Date.parse(notes[id1].updatedAt)
        )
    : [];
};

const NoteList = () => {
  const dispatch = useDispatch();

  const notebook = useGetActiveNotebook();
  const notes = useReduxSelector((state) => state.note.entities);
  const activeNoteId = useReduxSelector((state) => state.note.activeId);
  const [sortedNoteIds, setSortedNoteIds] = useState<string[]>([]);

  // Called when user changes notebook
  useEffect(() => {
    const tmp = sort(notes, notebook.noteIds);
    if (!notebook.noteIds.includes(activeNoteId)) {
      const firstId = tmp.length && tmp[0];
      dispatch(setActiveNoteId(firstId || ""));
    }
    setSortedNoteIds(tmp);
  }, [notebook.id]);

  useEffect(() => {
    setSortedNoteIds(sort(notes, notebook.noteIds));
  }, [notes]);

  // Responsive layout
  const { isNoteListOpen } = useContext(UIContext);

  return (
    <Container $isNoteListOpen={isNoteListOpen}>
      <Header notebook={notebook} />
      {sortedNoteIds?.length ? (
        <List>
          {sortedNoteIds &&
            sortedNoteIds.map(
              (id) =>
                notes[id] && (
                  <NoteListItem
                    key={id}
                    note={notes[id]}
                    $active={activeNoteId === id}
                  />
                )
            )}
        </List>
      ) : (
        <NoNotesMessage />
      )}
    </Container>
  );
};

export default NoteList;

interface ContainerProps {
  $isNoteListOpen?: boolean;
}

const Container = styled.div<ContainerProps>`
  user-select: none;
  color: #282a2c;
  background-color: var(--notelist-background);
  display: ${({ $isNoteListOpen }) => ($isNoteListOpen ? "block" : "none")};

  @media (min-width: 810px) {
    display: block;
  }
`;

const List = styled.div`
  ${scrollable};
  height: calc(100vh - 60px);
`;
