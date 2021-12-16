import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import OutlinedButton from "../shared/OutlinedButton";
import ContainedButton from "../shared/ContainedButton";
import ErrorMessage from "../shared/ErrorMessage";
import { moveNote } from "../../actions/notes.action";
import { useReduxSelector } from "../../hooks";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoveNoteDialog = ({ open, setOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const activeNoteId = useReduxSelector((state) => state.note.activeId);
  const currentNotebookId = useReduxSelector(
    (state) => state.note.entities[activeNoteId]?.notebookId
  );
  const notebookIds = useReduxSelector((state) => state.notebook.ids);
  const notebooks = useReduxSelector((state) => state.notebook.entities);

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      moveNote(
        activeNoteId,
        currentNotebookId,
        "",
        handleClose,
        setErrorMessage
      )
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Move note</DialogTitle>
      <DialogContent>
        <Select id="notebook" defaultValue="Choose a location...">
          <option value="Choose a location..." disabled>
            Choose a location...
          </option>
          {notebookIds.map((id) => (
            <option key={id} value={id} disabled={id === currentNotebookId}>
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
        <ContainedButton type="submit" onClick={handleSubmit}>
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