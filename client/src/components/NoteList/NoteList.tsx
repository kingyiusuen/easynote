import React from "react";
import styled from "styled-components";
import { AiOutlineSortAscending } from "react-icons/ai";
import { HiOutlinePencilAlt, HiOutlineFilter } from "react-icons/hi";
import NoteListItem from "./NoteListItem";
import NoNotesMessage from "./NoNotesMessage";
import { scrollable, baseIconButton } from "../../styles/mixins";
import { useReduxSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes.action";

const Wrapper = styled.div`
  user-select: none;
  color: #282a2c;
  background-color: #f5f5f4;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  color: #bbbcbd;
`;

const IconButton = styled.button`
  ${baseIconButton}
  font-size: 28px;
  color: #bbbcbd;

  &:hover {
    color: #9b9a9a;
  }
`;

const Header = styled.div`
  padding: 0 16px;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h2`
  font-weight: 400;
  font-size: 22px;
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

  & ${IconWrapper} {
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

const NoteList = ({ noteIds }: { noteIds: string[] }) => {
  const dispatch = useDispatch();
  const activeNoteId = useReduxSelector((state) => state.note.activeId);
  const activeNotebookId = useReduxSelector((state) => state.notebook.activeId);
  const noteEntities = useReduxSelector((state) => state.note.entities);

  const handleCreateNoteClick = () => {
    dispatch(createNote(activeNotebookId));
  };

  return (
    <Wrapper>
      <Header>
        <IconButton>
          <AiOutlineSortAscending />
        </IconButton>
        <Heading>All Notes</Heading>
        <IconButton title="Create New Note" onClick={handleCreateNoteClick}>
          <HiOutlinePencilAlt />
        </IconButton>
      </Header>
      <SearchBarWrapper>
        <SearchBar>
          <IconWrapper>
            <HiOutlineFilter />
          </IconWrapper>
          <Input type="text" placeholder="Filter" />
        </SearchBar>
      </SearchBarWrapper>
      {noteIds?.length ? (
        <List>
          {noteIds &&
            noteIds.map((id) => (
              <NoteListItem
                key={id}
                note={noteEntities[id]}
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
