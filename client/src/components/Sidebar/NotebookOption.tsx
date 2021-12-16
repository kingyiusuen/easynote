import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";
import { Notebook } from "../../types";
import { UIContext } from "../../contexts";

interface ContainerProps {
  $active: boolean;
}

interface ComponentProps extends ContainerProps {
  notebook: Notebook;
}

const NotebookOption = ({ notebook, $active }: ComponentProps) => {
  const { toggleSidebar } = useContext(UIContext);

  return (
    <Link to={`/home/${notebook.id}`} onClick={toggleSidebar}>
      <Container $active={$active}>
        <TextWrapper>{notebook.name}</TextWrapper>
      </Container>
    </Link>
  );
};

export default NotebookOption;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 16px;
  height: 36px;
  color: var(--sidebar-text-normal);
  padding-left: 43px;
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
