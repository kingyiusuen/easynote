import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter, scrollable, baseIconButton } from "../../styles/mixins";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useReduxSelector } from "../../hooks";
import CreateNotebookDialog from "./CreateNotebookDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth.action";
import AllNotesOption from "./AllNotesOption";
import NotebookOption from "./NotebookOption";

const Container = styled.div`
  background-color: var(--sidebar-background);
  user-select: none;
`;

const IconWrapper = styled.div`
  ${flexCenter}
  font-size: 20px;
`;

const List = styled.div`
  ${scrollable};
  padding: 18px 0;
  height: calc(100vh - 60px);
`;

const TextWrapper = styled.span`
  font-size: 15px;
`;

const ListHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  height: 36px;
  color: var(--sidebar-text-muted);
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
  padding: 0px 24px;
  color: var(--sidebar-text-normal);
  background-color: #0c0f13;
`;

interface ListHeadingProps {
  icon: React.ReactNode;
  text: string;
  buttonIcon: React.ReactNode;
}

const ListHeading = ({ icon, text, buttonIcon }: ListHeadingProps) => {
  return (
    <ListHeadingWrapper>
      <IconWrapper>{icon}</IconWrapper>
      <TextWrapper>{text}</TextWrapper>
      <IconButton>{buttonIcon}</IconButton>
    </ListHeadingWrapper>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const notebooks = useReduxSelector((state) => state.notebook);
  const user = useReduxSelector((state) => state.auth.user);

  return (
    <Container>
      <List>
        <AllNotesOption $active={notebooks.activeId === "all"} />
        <ListHeading
          icon={<BiBook />}
          text="Notebooks"
          buttonIcon={<AiOutlinePlusCircle onClick={() => setOpen(true)} />}
        />
        {notebooks.ids &&
          notebooks.ids.map((id) => (
            <NotebookOption
              key={id}
              notebook={notebooks.entities[id]}
              $active={notebooks.activeId === id}
            />
          ))}
      </List>
      <Footer>
        <span>{user?.username}</span>
        <IconButton title="Logout" onClick={() => dispatch(logout())}>
          <RiLogoutCircleRLine />
        </IconButton>
      </Footer>
      <CreateNotebookDialog open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Sidebar;
