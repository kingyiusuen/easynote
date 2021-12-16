import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import { NoteIdEntityMap } from "../../types";

interface SearchBarProps {
  notes: NoteIdEntityMap;
  noteIds: string[];
  setSortedNoteIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchBar = ({ notes, noteIds, setSortedNoteIds }: SearchBarProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  // Start search 0.5 seconds after user stops typing
  const [debouncedText] = useDebounce(text, 500);

  useEffect(() => {
    const filteredIds = noteIds.filter(
      (id) =>
        notes[id].title.includes(debouncedText) ||
        notes[id].content.includes(debouncedText)
    );
    setSortedNoteIds(filteredIds);
  }, [debouncedText]);

  return (
    <Wrapper>
      <Container>
        <HiOutlineFilter />
        <Input type="text" placeholder="Filter" onChange={handleChange} />
      </Container>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  padding: 0 16px;
  height: 50px;
`;

const Container = styled.div`
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
