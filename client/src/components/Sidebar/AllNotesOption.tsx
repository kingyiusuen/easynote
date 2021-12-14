import React from "react";
import { CgNotes } from "react-icons/cg";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveNotebookId } from "../../actions/notebooks.action";
import { flexCenter } from "../../styles/mixins";

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  height: 36px;
  color: var(--sidebar-text-normal);
  ${({ $active }) =>
    $active && "background-color: var(--sidebar-background-active);"}

  &:hover {
    cursor: pointer;
    background-color: ${({ $active }) =>
      $active
        ? "var(--sidebar-background-active)"
        : "var(--sidebar-background-hover)"};
  }

  & > svg {
    ${flexCenter}
    font-size: 20px;
  }
`;

const TextWrapper = styled.span`
  font-size: 15px;
`;

interface ContainerProps {
  $active: boolean;
  $indent?: boolean;
}

const AllNotesOption = ({ $active }: { $active: boolean }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveNotebookId("all"));
  };

  return (
    <Container onClick={handleClick} $active={$active}>
      <CgNotes />
      <TextWrapper>All Notes</TextWrapper>
    </Container>
  );
};

export default AllNotesOption;
