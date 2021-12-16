import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import OutlinedButton from "../shared/OutlinedButton";
import ErrorMessage from "../shared/ErrorMessage";
import { deleteNotebook } from "../../actions/notebooks.action";
import { useGetActiveNotebookId } from "../../hooks";
import DialogContentText from "@mui/material/DialogContentText";
import { baseButton } from "../../styles/mixins";
import { useNavigate } from "react-router-dom";

interface DialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteNotebookDialog = ({ open, setOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const activeNotebookId = useGetActiveNotebookId();

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  const callbackOnSuccess = () => {
    navigate("/all");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      deleteNotebook(activeNotebookId, callbackOnSuccess, setErrorMessage)
    );
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
        <DeleteButton type="submit" onClick={handleSubmit}>
          Delete
        </DeleteButton>
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
