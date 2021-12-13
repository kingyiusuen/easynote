import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter, scrollable, baseIconButton } from "../../styles/mixins";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Notebook } from "../../types";
import { useReduxSelector } from "../../hooks";
import FormDialog from "./CreateNotebookDialog";
import { useDispatch } from "react-redux";
import { setActiveNotebookId } from "../../actions/notes.action";
import { logout } from "../../actions/auth.action";

const Container = styled.div`
  background-color: var(--nav-background);
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

const ListItemWrapper = styled.div<ListItemWrapper>`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  height: 36px;
  color: var(--nav-text-normal);
  ${({ $active }) =>
    $active && "background-color: var(--nav-background-active);"}

  ${({ $indent }) => $indent && "padding-left: 44px;"}

  &:hover {
    cursor: pointer;
    background-color: ${({ $active }) =>
      $active ? "var(--nav-background-active)" : "var(--nav-background-hover)"};
  }
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
  color: var(--nav-text-muted);
`;

const IconButton = styled.button`
  ${baseIconButton}
  font-size: 20px;
  margin-left: auto;
  color: var(--nav-text-muted);

  &:hover {
    color: var(--nav-text-normal);
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  height: 60px;
  padding: 0px 24px;
  color: var(--nav-text-normal);
  background-color: #0c0f13;
`;

interface ListItemProps {
  icon?: React.ReactNode;
  notebook: Notebook;
  $active: boolean;
  $indent?: boolean;
}

interface ListItemWrapper {
  $active: boolean;
  $indent?: boolean;
}

const ListItem = ({ icon, notebook, $active, $indent }: ListItemProps) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveNotebookId(notebook.id));
  };

  return (
    <ListItemWrapper onClick={handleClick} $indent={$indent} $active={$active}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <TextWrapper>{notebook.name}</TextWrapper>
    </ListItemWrapper>
  );
};

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

const Nav = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const activeNotebookId = useReduxSelector(
    (state) => state.notes.activeNotebookId
  );
  const notebooks = useReduxSelector((state) => state.notes.notebooks);
  const user = useReduxSelector((state) => state.auth.user);

  return (
    <Container>
      <List>
        <ListItem
          icon={<CgNotes />}
          notebook={{ id: "all", name: "All Notes", notes: [] }}
          $active={activeNotebookId === "all"}
        />
        <ListHeading
          icon={<BiBook />}
          text="Notebooks"
          buttonIcon={<AiOutlinePlusCircle onClick={() => setOpen(true)} />}
        />
        {notebooks &&
          notebooks.map((notebook) => (
            <ListItem
              key={notebook.id}
              notebook={notebook}
              $active={activeNotebookId === notebook.id}
              $indent
            />
          ))}
      </List>
      <Footer>
        <span>{user?.username}</span>
        <IconButton title="Logout" onClick={() => dispatch(logout())}>
          <RiLogoutCircleRLine />
        </IconButton>
      </Footer>
      <FormDialog open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Nav;
