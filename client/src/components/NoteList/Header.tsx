import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import { HiDotsHorizontal, HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createNote } from "../../actions/notes.action";
import { baseIconButton } from "../../styles/mixins";
import RenameNotebookDialog from "./RenameNotebookDialog";
import DeleteNotebookDialog from "./DeleteNotebookDialog";

interface HeaderProps {
  activeNotebookId: string;
}

const Header = ({ activeNotebookId }: HeaderProps) => {
  const dispatch = useDispatch();
  const [isRenameNotebookDialogOpen, setIsRenameNotebookDialogOpen] =
    useState(false);
  const [isDeleteNotebookDialogOpen, setIsDeleteNotebookDialogOpen] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCreateNoteClick = () => {
    dispatch(createNote(activeNotebookId));
  };

  const handleRenameNotebookClick = () => {
    handleCloseMenu();
    setIsRenameNotebookDialogOpen(true);
  };

  const handleDeleteNotebookClick = () => {
    handleCloseMenu();
    setIsDeleteNotebookDialogOpen(true);
  };

  return (
    <Container>
      <Heading>All Notes</Heading>
      <ButtonGroup>
        <IconButton title="Add new note" onClick={handleCreateNoteClick}>
          <HiOutlinePencilAlt />
        </IconButton>
        <IconButton title="More" onClick={handleClick}>
          <HiDotsHorizontal />
        </IconButton>
      </ButtonGroup>
      <StyledMenu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleRenameNotebookClick} disableRipple>
          Rename notebook
        </MenuItem>
        <MenuItem onClick={handleDeleteNotebookClick} disableRipple>
          Delete notebook
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem disabled>Sort by</MenuItem>
        <MenuItem onClick={handleCloseMenu} disableRipple>
          Date updated
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} disableRipple>
          Date created
        </MenuItem>
      </StyledMenu>
      <InvisibleDiv>
        <RenameNotebookDialog
          open={isRenameNotebookDialogOpen}
          setOpen={setIsRenameNotebookDialogOpen}
        />
        <DeleteNotebookDialog
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
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h2`
  font-weight: 400;
  font-size: 22px;
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

const StyledMenu = styled(Menu)`
  .MuiMenuItem-root {
    font-size: 14px;
    padding: 4px 16px;
  }
`;

const InvisibleDiv = styled.div`
  display: none;
`;
