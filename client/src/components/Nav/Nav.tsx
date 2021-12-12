import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter, scrollable, baseIconButton } from "../../styles/mixins";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Notebook } from "../../types";
import FormDialog from "./Dialog";

const Wrapper = styled.div`
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
  setActiveNotebookId: React.Dispatch<React.SetStateAction<string | null>>;
  notebook: Notebook;
  $active: boolean;
  $indent?: boolean;
}

interface ListItemWrapper {
  $active: boolean;
  $indent?: boolean;
}

const ListItem = ({
  icon,
  notebook,
  setActiveNotebookId,
  $active,
  $indent,
}: ListItemProps) => {
  const handleClick = () => {
    setActiveNotebookId(notebook.id);
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
  const [activeNotebookId, setActiveNotebookId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <List>
        <ListItem
          icon={<CgNotes />}
          setActiveNotebookId={setActiveNotebookId}
          notebook={{ id: "1000", name: "All Notes", notes: [] }}
          $active={activeNotebookId === "1000"}
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
              setActiveNotebookId={setActiveNotebookId}
              notebook={notebook}
              $active={activeNotebookId === notebook.id}
              $indent
            />
          ))}
      </List>
      <Footer>
        <span>john_doe</span>
        <IconButton title="Logout">
          <RiLogoutCircleRLine />
        </IconButton>
      </Footer>
      <FormDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default Nav;

const notebooks: Notebook[] = [
  { id: "1", name: "Blog", notes: [] },
  { id: "2", name: "Work", notes: [] },
  { id: "3", name: "School", notes: [] },
];
