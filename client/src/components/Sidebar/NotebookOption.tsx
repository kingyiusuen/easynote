import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setActiveNotebookId } from "../../actions/notebooks.action";
import { flexCenter } from "../../styles/mixins";
import { Notebook } from "../../types";

interface ContainerProps {
  $active: boolean;
}

interface ComponentProps extends ContainerProps {
  notebook: Notebook;
}

const NotebookOption = ({ notebook, $active }: ComponentProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveNotebookId(notebook.id));
  };

  return (
    <Container onClick={handleClick} $active={$active}>
      <TextWrapper>{notebook.name}</TextWrapper>
    </Container>
  );
};

export default NotebookOption;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  height: 36px;
  color: var(--sidebar-text-normal);
  padding-left: 44px;
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
