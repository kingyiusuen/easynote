import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import * as timeago from "timeago.js";
import { Note } from "../../types";
import { truncatedText } from "../../styles/mixins";
import { setActiveNoteId } from "../../actions/notes.action";
import stripHTML from "../../utils/stripHTML";

interface WrapperProps {
  $active: boolean;
}

interface ComponentProps {
  note: Note;
  $active: boolean;
}

const NoteListItem = ({ note, $active }: ComponentProps) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setActiveNoteId(note.id));
  };

  return (
    <Wrapper onClick={handleClick} $active={$active}>
      <Title>{note.title ? note.title : "Untitled"}</Title>
      <Content>{stripHTML(note.content)}</Content>
      <Timestamp>{timeago.format(note.updatedAt)}</Timestamp>
      <IconWrapper $active={$active}>
        <FaTrashAlt />
      </IconWrapper>
    </Wrapper>
  );
};

export default NoteListItem;

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
  height: 102px;
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
  margin-bottom: 10px;
  min-height: 18px;
  ${truncatedText}
`;

const Timestamp = styled.div`
  color: #828384;
  font-size: 12px;
`;
