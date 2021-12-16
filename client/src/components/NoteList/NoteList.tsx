import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NoteListItem from "./NoteListItem";
import NoNotesMessage from "./NoNotesMessage";
import { scrollable } from "../../styles/mixins";
import { useGetActiveNotebook, useReduxSelector } from "../../hooks";
import { setActiveNoteId } from "../../actions/notes.action";
import { NoteIdEntityMap } from "../../types";

export type SortCriterion = "createdAt" | "updatedAt";

const sort = (
  notes: NoteIdEntityMap,
  noteIds: string[],
  sortCriterion: SortCriterion,
  ascendingOrder: boolean
) => {
  const sortedNoteIds = noteIds
    ?.slice()
    .sort(
      (id1, id2) =>
        Date.parse(notes[id1][sortCriterion]) -
        Date.parse(notes[id2][sortCriterion])
    );
  if (!ascendingOrder) sortedNoteIds.reverse();
  return sortedNoteIds;
};

const NoteList = () => {
  const notebook = useGetActiveNotebook();

  // Sort the notes and set the first note as active
  const notes = useReduxSelector((state) => state.note.entities);
  const noteIds = notebook.noteIds;

  const [sortedNoteIds, setSortedNoteIds] = useState<string[]>([]);
  const [sortCriterion, setSortCriterion] =
    useState<SortCriterion>("updatedAt");
  const [ascendingOrder, setAscendingOrder] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const tmp = sort(notes, noteIds, sortCriterion, ascendingOrder);
    const firstId = tmp.length && tmp[0];
    dispatch(setActiveNoteId(firstId || ""));
    setSortedNoteIds(tmp);
  }, [notebook.id]);

  useEffect(() => {
    setSortedNoteIds(sort(notes, noteIds, sortCriterion, ascendingOrder));
  }, [sortCriterion, ascendingOrder]);

  const activeNoteId = useReduxSelector((state) => state.note.activeId);

  return (
    <Wrapper>
      <Header
        notebook={notebook}
        sortCriterion={sortCriterion}
        setSortCriterion={setSortCriterion}
        ascendingOrder={ascendingOrder}
        setAscendingOrder={setAscendingOrder}
      />
      <SearchBar
        notes={notes}
        noteIds={noteIds}
        setSortedNoteIds={setSortedNoteIds}
      />
      {sortedNoteIds?.length ? (
        <List>
          {sortedNoteIds &&
            sortedNoteIds.map((id) => (
              <NoteListItem
                key={id}
                note={notes[id]}
                sortCriterion={sortCriterion}
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

const List = styled.div`
  ${scrollable};
  height: calc(100vh - 54px - 50px);
`;
