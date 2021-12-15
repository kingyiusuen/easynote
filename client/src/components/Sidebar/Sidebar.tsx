import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter, scrollable, baseIconButton } from "../../styles/mixins";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useGetNotebookId, useReduxSelector } from "../../hooks";
import CreateNotebookDialog from "./CreateNotebookDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/session.action";
import AllNotesOption from "./AllNotesOption";
import NotebookOption from "./NotebookOption";
import ArrowTooltip from "../shared/ArrowTooltip";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const notebookId = useGetNotebookId();
  const notebooks = useReduxSelector((state) => state.notebook);
  const user = useReduxSelector((state) => state.session.user);

  return (
    <Container>
      <List>
        <AllNotesOption $active={notebookId === "all"} />
        <Heading>
          <HeadingLeft>
            <BiBook />
            <TextWrapper>Notebooks</TextWrapper>
          </HeadingLeft>
          <ArrowTooltip title="Create notebook" placement="right">
            <IconButton onClick={() => setOpen(true)}>
              <AiOutlinePlusCircle />
            </IconButton>
          </ArrowTooltip>
        </Heading>

        {notebooks.ids &&
          notebooks.ids.map((id) => (
            <NotebookOption
              key={id}
              notebook={notebooks.entities[id]}
              $active={notebookId === id}
            />
          ))}
      </List>
      <Footer>
        <span>{user?.username}</span>
        <ArrowTooltip title="Logout" placement="right">
          <IconButton onClick={() => dispatch(logout())}>
            <RiLogoutCircleRLine />
          </IconButton>
        </ArrowTooltip>
      </Footer>
      <CreateNotebookDialog open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  background-color: var(--sidebar-background);
  user-select: none;
`;

const List = styled.div`
  ${scrollable};
  padding: 18px 0;
  height: calc(100vh - 60px);
`;

const TextWrapper = styled.span`
  font-size: 15px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 36px;
  color: var(--sidebar-text-muted);

  & svg {
    ${flexCenter}
    font-size: 20px;
  }
`;

const HeadingLeft = styled.div`
  display: flex;
  gap: 7px;
`;

const IconButton = styled.button`
  ${baseIconButton}
  font-size: 20px;
  margin-left: auto;
  color: var(--sidebar-text-muted);

  &:hover {
    color: var(--sidebar-text-normal);
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  height: 60px;
  padding: 0px 16px;
  color: var(--sidebar-text-normal);
  background-color: #0c0f13;
`;
