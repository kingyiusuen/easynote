import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ContainedButton from "../shared/ContainedButton";
import OutlinedButton from "../shared/OutlinedButton";
import ErrorMessage from "../shared/ErrorMessage";
import { removeNotebook } from "../../actions/notebooks.action";
import { useReduxSelector } from "../../hooks";
import DialogContentText from "@mui/material/DialogContentText";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteNotebookDialog = ({ open, setOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const user = useReduxSelector((state) => state.auth.user);
  const activeNotebookId = useReduxSelector((state) => state.notebook.activeId);

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      dispatch(removeNotebook(activeNotebookId, handleClose, setErrorMessage));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete notebook</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Any notes in the notebook will be remove permanently. This cannot be
          undone.
        </DialogContentText>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <OutlinedButton type="button" onClick={handleClose}>
          Cancel
        </OutlinedButton>
        <ContainedButton type="submit" onClick={handleSubmit}>
          Delete
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNotebookDialog;

const Dialog = styled(MuiDialog)`
  user-select: none;

  .MuiDialogActions-root {
    margin-right: 12px;
  }
`;
