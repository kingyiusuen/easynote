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
    height: calc(100vh - 42px);
    border: none;
    font-size: 16px !important;
  }

  .ql-editor {
    ${scrollable}
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

  return <QuillEditor modules={modules} value={value} onChange={logChange} />;
};

export default Editor;
