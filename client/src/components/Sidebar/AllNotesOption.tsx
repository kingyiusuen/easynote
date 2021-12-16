import React, { useContext } from "react";
import { CgNotes } from "react-icons/cg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";
import { UIContext } from "../../contexts";

interface ContainerProps {
  $active: boolean;
}

const AllNotesOption = ({ $active }: ContainerProps) => {
  const { toggleSidebar } = useContext(UIContext);

  return (
    <Link to="/home/all" onClick={toggleSidebar}>
      <Container $active={$active}>
        <CgNotes />
        <TextWrapper>All Notes</TextWrapper>
      </Container>
    </Link>
  );
};

export default AllNotesOption;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 16px;
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
