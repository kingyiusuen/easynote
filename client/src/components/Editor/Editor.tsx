import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateNote } from "../../actions/notes.action";
import { scrollable } from "../../styles/mixins";
import { useReduxSelector } from "../../hooks";
import { useDispatch } from "react-redux";

interface Props {
  noteId: string;
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

const AUTOSAVE_INTERVAL = 1500; // 1.5 seconds

const Editor = ({ noteId }: Props) => {
  const dispatch = useDispatch();
  const note = useReduxSelector((state) => state.note.entities[noteId]);

  const isFirstRun = useRef(true);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  // Autosaving
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
      } else {
        dispatch(updateNote(noteId, { title, content }));
      }
    }, AUTOSAVE_INTERVAL);

    return () => {
      clearTimeout(timer);
    };
  }, [title, content]);

  return (
    <div>
      <Header>
        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => handleTitleChange(event)}
        />
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
`;

const TitleInput = styled.input`
  border: none;
  width: 100%;
  font-size: 32px;
  padding: 12px 15px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;
