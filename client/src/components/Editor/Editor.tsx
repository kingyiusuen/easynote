import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import styled, { css } from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";
import { MdDriveFileMove, MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DeleteNoteDialog from "./DeleteNoteDialog";
import { updateNote } from "../../actions/notes.action";
import { baseIconButton, flexCenter, scrollable } from "../../styles/mixins";
import ArrowTooltip from "../shared/ArrowTooltip";
import MoveNoteDialog from "./MoveNoteDialog";
import { useReduxSelector } from "../../hooks";

interface ContainerProps {
  $fullScreen: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const AUTOSAVE_INTERVAL = 500;

const Editor = () => {
  const note = useReduxSelector(
    (state) => state.note.entities[state.note.activeId]
  );
  const [syncStatus, setSyncStatus] = useState("All changes saved");
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
  });
  const [isFirstRun, setIsFirstRun] = useState(false);

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNoteForm({ ...noteForm, title: event.currentTarget.value });
  };

  const handleContentChange = (content: string) => {
    setNoteForm({ ...noteForm, content });
  };

  // Autosaving
  const dispatch = useDispatch();

  useEffect(() => {
    setNoteForm({ title: note.title, content: note.content });
    setIsFirstRun(true);
  }, [note.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFirstRun) {
      setIsFirstRun(false);
    } else {
      timer = setTimeout(() => {
        dispatch(updateNote(note.id, noteForm, setSyncStatus));
      }, AUTOSAVE_INTERVAL);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [noteForm]);

  // Full screen
  const [fullScreen, setFullScreen] = useState(false);
  const toggleFullScreen = () => setFullScreen(!fullScreen);

  // Header menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [isDeleteNoteDialogOpen, setIsDeleteNoteDialogOpen] = useState(false);
  const handleDeleteNoteClick = () => {
    handleCloseMenu();
    setIsDeleteNoteDialogOpen(true);
  };

  const [isMoveNoteDialogOpen, setIsMoveNoteDialogOpen] = useState(false);
  const handleMoveNoteClick = () => {
    handleCloseMenu();
    setIsMoveNoteDialogOpen(true);
  };

  return (
    <Container $fullScreen={fullScreen}>
      <Header>
        <CenteredDiv>
          <ArrowTooltip title={fullScreen ? "Collapse note" : "Expand note"}>
            <FullScreenButton onClick={toggleFullScreen}>
              {fullScreen ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}
            </FullScreenButton>
          </ArrowTooltip>
        </CenteredDiv>
        <TitleInput
          type="text"
          placeholder="Title"
          value={noteForm.title}
          onChange={(event) => handleTitleChange(event)}
        />
        <CenteredDiv>
          <ArrowTooltip title="More actions">
            <IconButton onClick={handleClick}>
              <HiDotsHorizontal />
            </IconButton>
          </ArrowTooltip>
        </CenteredDiv>
        <StyledMenu
          id="fade-menu"
          MenuListProps={{ "aria-labelledby": "fade-button" }}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleMoveNoteClick} disableRipple>
            <MdDriveFileMove />
            Move note
          </MenuItem>
          <MenuItem onClick={handleDeleteNoteClick} disableRipple>
            <MdDeleteForever />
            Delete note
          </MenuItem>
        </StyledMenu>
        <InvisibleDiv>
          <DeleteNoteDialog
            note={note}
            open={isDeleteNoteDialogOpen}
            setOpen={setIsDeleteNoteDialogOpen}
          />
          <MoveNoteDialog
            note={note}
            open={isMoveNoteDialogOpen}
            setOpen={setIsMoveNoteDialogOpen}
          />
        </InvisibleDiv>
      </Header>
      <QuillEditor
        modules={modules}
        placeholder="Start writing here"
        value={noteForm.content}
        onChange={handleContentChange}
      />
      <Footer>{syncStatus}</Footer>
    </Container>
  );
};

export default Editor;

const Container = styled.div<ContainerProps>`
  background-color: white;

  ${({ $fullScreen }) =>
    $fullScreen &&
    css`
      z-index: 9999;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    `};
`;

const QuillEditor = styled(ReactQuill)`
    &:focus {
      outline: none;
    }
  }

  .quill {
    overflow: hidden;
  }

  .ql-toolbar.ql-snow {
    border: none;
    overflow-x: hidden;
    white-space: nowrap;

    .ql-formats {
      margin-right: 0;
  
      @media (min-width: 1050px) {
        margin-right: 15px;
      }
    }
  }

  .ql-container.ql-snow {
    height: calc(100vh - 54px - 40px - 40px); // Minus heights of header, toolbar and footer
    border: none;
    font-size: 16px !important;
  }

  .ql-editor.ql-blank::before {
    font-style: normal;
    opacity: 0.5;
  }

  .ql-editor {
    ${scrollable}
  }
`;

const Header = styled.div`
  height: 54px;
  display: flex;
  padding: 0 15px;
  gap: 16px;
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  font-size: 32px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
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

const FullScreenButton = styled(IconButton)`
  font-size: 22px;
  width: 28px;
  height: 28px;
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

const CenteredDiv = styled.div`
  ${flexCenter}
`;

const InvisibleDiv = styled.div`
  display: none;
`;

const Footer = styled.div`
  padding: 12px 15px;
  height: 40px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  text-align: right;
`;
