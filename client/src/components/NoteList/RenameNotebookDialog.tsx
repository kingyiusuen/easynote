import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ContainedButton from "../shared/ContainedButton";
import OutlinedButton from "../shared/OutlinedButton";
import Input from "../shared/Input";
import ErrorMessage from "../shared/ErrorMessage";
import { renameNotebook } from "../../actions/notebooks.action";
import { useReduxSelector } from "../../hooks";
import { Notebook } from "../../types";

interface DialogProps {
  notebook: Notebook;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RenameNotebookDialog = ({ notebook, open, setOpen }: DialogProps) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const user = useReduxSelector((state) => state.session.user);

  const handleClose = () => {
    setInputValue("");
    setErrorMessage("");
    setOpen(false);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      dispatch(
        renameNotebook(
          notebook.id,
          { name: inputValue },
          handleClose,
          setErrorMessage
        )
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename notebook</DialogTitle>
        <DialogContent>
          <Input
            placeholder="Notebook name"
            defaultValue={notebook.name}
            onChange={handleChange}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </DialogContent>
        <DialogActions>
          <OutlinedButton type="button" onClick={handleClose}>
            Cancel
          </OutlinedButton>
          <ContainedButton
            type="submit"
            disabled={inputValue === "" || inputValue === notebook.name}
            onClick={handleSubmit}
          >
            Continue
          </ContainedButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RenameNotebookDialog;

const Dialog = styled(MuiDialog)`
  user-select: none;

  ${Input} {
    margin-top: 12px;
    width: 400px;
  }

  .MuiDialogActions-root {
    margin-right: 12px;
  }
`;
