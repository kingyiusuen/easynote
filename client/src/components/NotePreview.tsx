import React from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { Note } from "../types";
import { truncatedText } from "../styles/mixins";

const IconWrapper = styled.div<WrapperProps>`
  position: absolute;
  font-size: 20px;
  margin: 12px 8px 8px 8px;
  top: 0;
  right: 0;
  display: none;
  color: ${({ $active }) => ($active ? "#9b9a9a" : "#bbbcbd")};

  &:hover {
    color: ${({ $active }) => ($active ? "#6f7070" : "#9b9a9a")};
  }
`;

const Wrapper = styled.div<WrapperProps>`
  font-size: 15px;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: ${({ $active }) => $active && "#d3d1d1"};
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${({ $active }) => !$active && "#ececec"};

    ${IconWrapper} {
      display: unset;
    }
  }
`;

const Title = styled.div`
  font-weight: 500;
  color: #282a2c;
  margin-bottom: 8px;
`;

const Content = styled.div`
  color: #828384;
  ${truncatedText}
`;

interface WrapperProps {
  $active: boolean;
}

interface NotePreviewProps {
  note: Note;
  setActiveNoteId: React.Dispatch<React.SetStateAction<string | null>>;
  $active: boolean;
}

const NotePreview = ({ note, setActiveNoteId, $active }: NotePreviewProps) => {
  const handleClick = () => {
    setActiveNoteId(note.id);
  };

  return (
    <Wrapper onClick={handleClick} $active={$active}>
      <Title>{note.title}</Title>
      <Content>{note.content}</Content>
      <IconWrapper $active={$active}>
        <FaTrashAlt />
      </IconWrapper>
    </Wrapper>
  );
};

export default NotePreview;
