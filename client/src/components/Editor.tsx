import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { scrollable } from "../styles/mixins";

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

const Editor = () => {
  const [value, setValue] = useState("");

  const logChange = (value: string) => {
    setValue(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  return (
    <div>
      <Header>
        <TitleInput type="text" placeholder="Title" />
      </Header>
      <QuillEditor
        modules={modules}
        placeholder="Start writing here"
        value={value}
        onChange={logChange}
      />
    </div>
  );
};

export default Editor;
