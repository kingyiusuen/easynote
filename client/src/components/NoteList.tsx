import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSortAscending } from "react-icons/ai";
import { HiOutlinePencilAlt, HiOutlineFilter } from "react-icons/hi";
import NotePreview from "./NotePreview";
import { scrollable, baseIconButton } from "../styles/mixins";

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

const NoteList = () => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const notes = [
    {
      id: "1",
      content:
        "<p>Lesson learnt while building my React Native mobile app</p><p>I'm developing a Markdown note-taking app and it is not easy</p>",
      title: "",
    },
    {
      id: "3",
      content:
        "<p>I don't like doing this</p><p>I'm developing a Markdown note-taking app and it is not easy</p>",
      title: "",
    },
  ];

  notes.map((note, index) => {
    const content = notes[index].content;
    const searchTerm = "</p>";
    const firstOccurrenceIndex = content.indexOf(searchTerm);
    const title = content.substring(
      0,
      firstOccurrenceIndex + searchTerm.length
    );
    notes[index].title = title;
  });

  return (
    <Wrapper>
      <Header>
        <IconButton>
          <AiOutlineSortAscending />
        </IconButton>
        <Heading>All Notes</Heading>
        <IconButton title="Create New Note">
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
      <List>
        {notes &&
          notes.map((note) => (
            <NotePreview
              key={note.id}
              note={note}
              setActiveNoteId={setActiveNoteId}
              $active={activeNoteId === note.id}
            />
          ))}
      </List>
    </Wrapper>
  );
};

export default NoteList;
