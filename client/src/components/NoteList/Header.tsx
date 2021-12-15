import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import { BiRename } from "react-icons/bi";
import { HiDotsHorizontal, HiOutlinePencilAlt } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createNote } from "../../actions/notes.action";
import { baseIconButton } from "../../styles/mixins";
import RenameNotebookDialog from "./RenameNotebookDialog";
import DeleteNotebookDialog from "./DeleteNotebookDialog";
import { useReduxSelector } from "../../hooks";
import ArrowTooltip from "../shared/ArrowTooltip";

interface HeaderProps {
  activeNotebookId: string;
}

const Header = ({ activeNotebookId }: HeaderProps) => {
  const notebookName =
    useReduxSelector(
      (state) => state.notebook.entities[activeNotebookId]?.name
    ) || "All Notes";

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
      <Heading>{notebookName}</Heading>
      <ButtonGroup>
        {activeNotebookId !== "all" && (
          <ArrowTooltip title="Add new note" placement="bottom">
            <IconButton onClick={handleCreateNoteClick}>
              <HiOutlinePencilAlt />
            </IconButton>
          </ArrowTooltip>
        )}
        <ArrowTooltip title="More actions" placement="bottom">
          <IconButton onClick={handleClick}>
            <HiDotsHorizontal />
          </IconButton>
        </ArrowTooltip>
      </ButtonGroup>
      <StyledMenu
        id="fade-menu"
        MenuListProps={{ "aria-labelledby": "fade-button" }}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        {activeNotebookId !== "all" && (
          <div>
            <MenuItem onClick={handleRenameNotebookClick} disableRipple>
              <BiRename />
              Rename notebook
            </MenuItem>
            <MenuItem onClick={handleDeleteNotebookClick} disableRipple>
              <MdDeleteForever />
              Delete notebook
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />{" "}
          </div>
        )}
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

    & svg {
      font-size: 18px;
      margin-right: 6px;
    }
  }
`;

const InvisibleDiv = styled.div`
  display: none;
`;
