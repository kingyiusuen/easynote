import React, { useContext, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { BiRename } from "react-icons/bi";
import { HiDotsHorizontal, HiMenu, HiOutlinePencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createNote } from "../../actions/notes.action";
import { baseIconButton, flexCenter, truncatedText } from "../../styles/mixins";
import RenameNotebookDialog from "./RenameNotebookDialog";
import DeleteNotebookDialog from "./DeleteNotebookDialog";
import ArrowTooltip from "../shared/ArrowTooltip";
import { Notebook } from "../../types";
import { UIContext } from "../../contexts";

interface HeaderProps {
  notebook: Notebook;
}

const Header = ({ notebook }: HeaderProps) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [isRenameNotebookDialogOpen, setIsRenameNotebookDialogOpen] =
    useState(false);

  const [isDeleteNotebookDialogOpen, setIsDeleteNotebookDialogOpen] =
    useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCreateNoteClick = () => {
    dispatch(createNote(notebook.id));
  };

  const handleRenameNotebookClick = () => {
    handleCloseMenu();
    setIsRenameNotebookDialogOpen(true);
  };

  const handleDeleteNotebookClick = () => {
    handleCloseMenu();
    setIsDeleteNotebookDialogOpen(true);
  };

  // Responsive layout
  const { toggleSidebar } = useContext(UIContext);

  return (
    <Container>
      <HeaderLeft>
        <HamburgerButton onClick={toggleSidebar}>
          <HiMenu />
        </HamburgerButton>
        <Heading>{notebook.name}</Heading>
      </HeaderLeft>
      {notebook.id !== "all" && (
        <ButtonGroup>
          <ArrowTooltip title="Add new note" placement="bottom">
            <IconButton onClick={handleCreateNoteClick}>
              <HiOutlinePencilAlt />
            </IconButton>
          </ArrowTooltip>
          <ArrowTooltip title="More actions" placement="bottom">
            <IconButton onClick={handleClick}>
              <HiDotsHorizontal />
            </IconButton>
          </ArrowTooltip>
        </ButtonGroup>
      )}
      <StyledMenu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        {notebook.id !== "all" && (
          <div>
            <MenuItem onClick={handleRenameNotebookClick} disableRipple>
              <BiRename />
              Rename notebook
            </MenuItem>
            <MenuItem onClick={handleDeleteNotebookClick} disableRipple>
              <MdDeleteForever />
              Delete notebook
            </MenuItem>
          </div>
        )}
      </StyledMenu>
      <InvisibleDiv>
        <RenameNotebookDialog
          notebook={notebook}
          open={isRenameNotebookDialogOpen}
          setOpen={setIsRenameNotebookDialogOpen}
        />
        <DeleteNotebookDialog
          notebook={notebook}
          open={isDeleteNotebookDialogOpen}
          setOpen={setIsDeleteNotebookDialogOpen}
        />
      </InvisibleDiv>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  padding: 0 16px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
`;

const HeaderLeft = styled.div`
  ${flexCenter}
  gap: 8px;
`;

const Heading = styled.h2`
  font-weight: 400;
  font-size: 22px;
  ${truncatedText}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  ${baseIconButton}
  font-size: 28px;
  padding: 2px;
  color: #9b9a9a;

  &:hover {
    background-color: #e9e9e7;
  }
`;

const HamburgerButton = styled(IconButton)`
  display: flex;

  @media (min-width: 1200px) {
    display: none;
  }
`;

const StyledMenu = styled(Menu)`
  .MuiMenuItem-root {
    font-size: 14px;
    padding: 4px 16px;

    & svg {
      font-size: 18px;
      margin-right: 6px;
    }
    &.active {
      color: #647dc1;
    }
  }
`;

const InvisibleDiv = styled.div`
  display: none;
`;
