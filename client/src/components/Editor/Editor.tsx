import React, { useContext, useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import styled, { css } from "styled-components";
import { HiOutlineArrowLeft, HiDotsHorizontal } from "react-icons/hi";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";
import { MdDriveFileMove, MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DeleteNoteDialog from "./DeleteNoteDialog";
import MoveNoteDialog from "./MoveNoteDialog";
import ArrowTooltip from "../shared/ArrowTooltip";
import { updateNote } from "../../actions/notes.action";
import { baseIconButton, flexCenter, scrollable } from "../../styles/mixins";
import { useReduxSelector } from "../../hooks";
import { UIContext } from "../../contexts";

interface ContainerProps {
  $fullScreen: boolean;
  $isNoteListOpen?: boolean;
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
  const dispatch = useDispatch();
  const note = useReduxSelector(
    (state) => state.note.entities[state.note.activeId]
  );

  // Record title and content changes
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  // Autosaving
  const [isFirstRun, setIsFirstRun] = useState(false);
  const [syncStatus, setSyncStatus] = useState("All changes saved");

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setIsFirstRun(true);
  }, [note.id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFirstRun) {
      setIsFirstRun(false);
    } else {
      timer = setTimeout(() => {
        dispatch(updateNote(note.id, { title, content }, setSyncStatus));
      }, AUTOSAVE_INTERVAL);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [title, content]);

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

  // Responsive layout
  const { isNoteListOpen, toggleNoteList } = useContext(UIContext);

  return (
    <Container $isNoteListOpen={isNoteListOpen} $fullScreen={fullScreen}>
      <Header>
        <CenteredDiv $hideInDesktop>
          <IconButton onClick={toggleNoteList}>
            <HiOutlineArrowLeft />
          </IconButton>
        </CenteredDiv>
        <CenteredDiv $showInDesktop>
          <ArrowTooltip title={fullScreen ? "Collapse note" : "Expand note"}>
            <FullScreenButton onClick={toggleFullScreen}>
              {fullScreen ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}
            </FullScreenButton>
          </ArrowTooltip>
        </CenteredDiv>
        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
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
        value={content}
        onChange={handleContentChange}
      />
      <Footer>{syncStatus}</Footer>
    </Container>
  );
};

export default Editor;

const Container = styled.div<ContainerProps>`
  background-color: white;
  display: ${({ $isNoteListOpen }) => ($isNoteListOpen ? "none" : "display")};

  @media (min-width: 810px) {
    display: block;
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
  }
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
    white-space: nowrap;

    .ql-formats {
      margin-right: 0;
  
      @media (min-width: 810px) {
        margin-right: 15px;
      }
    }
  }

  .ql-container.ql-snow {
    height: calc(100vh - 60px - 40px - 40px); // Minus heights of header, toolbar and footer
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
  height: 60px;
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

interface CenterDivProps {
  $showInDesktop?: boolean;
  $hideInDesktop?: boolean;
}

const showInDesktopStyle = css`
  display: none;

  @media (min-width: 810px) {
    display: flex;
  }
`;

const hideInDesktopStyle = css`
  display: flex;

  @media (min-width: 810px) {
    display: none;
  }
`;

const CenteredDiv = styled.div<CenterDivProps>`
  ${flexCenter}
  ${({ $showInDesktop }) => $showInDesktop && showInDesktopStyle}
  ${({ $hideInDesktop }) => $hideInDesktop && hideInDesktopStyle}
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
