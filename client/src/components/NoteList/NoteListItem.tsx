import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import * as timeago from "timeago.js";
import { Note } from "../../types";
import { truncatedText } from "../../styles/mixins";
import { setActiveNoteId } from "../../actions/notes.action";
import { stripHtml } from "string-strip-html";
import { UIContext } from "../../contexts";

interface ContainerProps {
  $active: boolean;
}

interface ComponentProps {
  note: Note;
  $active: boolean;
}

const NoteListItem = ({ note, $active }: ComponentProps) => {
  const { toggleNoteList } = useContext(UIContext);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (toggleNoteList) toggleNoteList();
    dispatch(setActiveNoteId(note.id));
  };

  return (
    <Container onClick={handleClick} $active={$active}>
      <Title>{note.title ? note.title : "Untitled"}</Title>
      <Content>{stripHtml(note.content).result}</Content>
      <Timestamp>{timeago.format(note.updatedAt)}</Timestamp>
    </Container>
  );
};

export default NoteListItem;

const Container = styled.div<ContainerProps>`
  font-size: 15px;
  padding: 16px;
  height: 102px;
  border-bottom: 1px solid var(--border-color);
  background-color: ${({ $active }) => $active && "#d3d1d1"};
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${({ $active }) => !$active && "#ececec"};
  }
`;

const Title = styled.div`
  font-weight: 500;
  color: #282a2c;
  margin-bottom: 8px;
  ${truncatedText}
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
