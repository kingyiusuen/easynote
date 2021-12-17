import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { moveNote } from "../../actions/notes.action";
import OutlinedButton from "../shared/OutlinedButton";
import ContainedButton from "../shared/ContainedButton";
import ErrorMessage from "../shared/ErrorMessage";
import { useReduxSelector } from "../../hooks";
import { Note } from "../../types";

interface DialogProps {
  note: Note;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue = "Choose a location...";

const MoveNoteDialog = ({ note, open, setOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const [targetNotebookId, setTargetNotebookId] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState("");
  const notebookIds = useReduxSelector((state) => state.notebook.ids);
  const notebooks = useReduxSelector((state) => state.notebook.entities);

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setTargetNotebookId(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      moveNote(
        note.id,
        note.notebookId,
        targetNotebookId,
        handleClose,
        setErrorMessage
      )
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Move note</DialogTitle>
      <DialogContent>
        <Select
          id="notebook"
          defaultValue={defaultValue}
          onChange={handleChange}
        >
          <option value={defaultValue} disabled>
            Choose a location...
          </option>
          {notebookIds.map((id) => (
            <option key={id} value={id} disabled={id === note.notebookId}>
              {notebooks[id].name}
            </option>
          ))}
        </Select>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <OutlinedButton type="button" onClick={handleClose}>
          Cancel
        </OutlinedButton>
        <ContainedButton
          type="submit"
          onClick={handleSubmit}
          disabled={targetNotebookId === defaultValue}
        >
          Move
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
};

export default MoveNoteDialog;

const Dialog = styled(MuiDialog)`
  user-select: none;

  .MuiDialogActions-root {
    margin-right: 12px;
  }
`;

const Select = styled.select`
  width: 400px;
  margin-top: 6px;
  margin-bottom: 12px;
  padding: 12px 8px 10px 12px;
  background-color: var(--notelist-background);
  border: 1px solid var(--notelist-background);
  color: var(--text-normal);
  font-size: 14px;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    outline: none;
  }
  /* https://codepen.io/vkjgr/pen/VYMeXp */
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
`;
