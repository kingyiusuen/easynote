import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import OutlinedButton from "../shared/OutlinedButton";
import ErrorMessage from "../shared/ErrorMessage";
import { deleteNote } from "../../actions/notes.action";
import { baseButton } from "../../styles/mixins";
import { Note } from "../../types";
import { useReduxSelector } from "../../hooks";

interface DialogProps {
  note: Note;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteNoteDialog = ({ note, open, setOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  // Set the next note in note list to active after deleting current note
  const notebook = useReduxSelector(
    (state) => state.notebook.entities[note.notebookId]
  );
  const currentNoteIdIndex = notebook.noteIds.findIndex(
    (noteId) => noteId === note.id
  );
  const nextNoteIdIndex = (currentNoteIdIndex + 1) % notebook.noteIds.length;
  const nextNoteId = notebook.noteIds[nextNoteIdIndex] || "";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      deleteNote(
        note.id,
        note.notebookId,
        nextNoteId,
        handleClose,
        setErrorMessage
      )
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The note will be remove permanently. This cannot be undone.
        </DialogContentText>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <OutlinedButton type="button" onClick={handleClose}>
          Cancel
        </OutlinedButton>
        <DeleteButton type="submit" onClick={handleSubmit}>
          Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNoteDialog;

const Dialog = styled(MuiDialog)`
  user-select: none;

  .MuiDialogActions-root {
    margin-right: 12px;
  }
`;

const DeleteButton = styled.button`
  ${baseButton}
  font-size: 15px;
  margin: 8px 0;
  padding: 10px 16px;
  color: white;
  background-color: var(--danger);
  border: 1px solid var(--danger);

  &:hover {
    background-color: #b33529;
    cursor: pointer;
  }
`;
