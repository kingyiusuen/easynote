import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";

interface ContainerProps {
  $active: boolean;
}

interface ComponentProps extends ContainerProps {
  notebookName: string;
  handleClick: () => void;
}

const NotebookOption = ({
  notebookName,
  handleClick,
  $active,
}: ComponentProps) => {
  return (
    <Container onClick={handleClick} $active={$active}>
      <TextWrapper>{notebookName}</TextWrapper>
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
