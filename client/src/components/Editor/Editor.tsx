import React, { useEffect, useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDriveFileMove, MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DeleteNoteDialog from "./DeleteNoteDialog";
import { updateNote } from "../../actions/notes.action";
import { baseIconButton, scrollable } from "../../styles/mixins";
import { Note } from "../../types";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const AUTOSAVE_INTERVAL = 1500; // 1.5 seconds

interface Props {
  note: Note;
}

const Editor = ({ note }: Props) => {
  const isFirstRun = useRef(true);
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  // Autosaving
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
      } else {
        dispatch(updateNote(note.id, { title, content }));
      }
    }, AUTOSAVE_INTERVAL);

    return () => {
      clearTimeout(timer);
    };
  }, [title, content]);

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

  return (
    <div>
      <Header>
        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => handleTitleChange(event)}
        />
        <IconButton title="More actions" onClick={handleClick}>
          <HiDotsHorizontal />
        </IconButton>
        <StyledMenu
          id="fade-menu"
          MenuListProps={{ "aria-labelledby": "fade-button" }}
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleCloseMenu} disableRipple>
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
            open={isDeleteNoteDialogOpen}
            setOpen={setIsDeleteNoteDialogOpen}
          />
        </InvisibleDiv>
      </Header>
      <QuillEditor
        modules={modules}
        placeholder="Start writing here"
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default Editor;

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
    height: calc(100vh - 62px - 40px); // Minus header height and toolbar height
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
  height: 62px;
  display: flex;
  padding: 12px 15px;
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
