import React, { useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ContainedButton from "../shared/ContainedButton";
import OutlinedButton from "../shared/OutlinedButton";
import Input from "../shared/Input";
import ErrorMessage from "../shared/ErrorMessage";
import { createNotebook } from "../../actions/notebooks.action";
import { useReduxSelector } from "../../hooks";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNotebookDialog = ({ open, setOpen }: Props) => {
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
        createNotebook(
          { userId: user.id, name: inputValue },
          handleClose,
          setErrorMessage
        )
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create new notebook</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Notebooks are useful for grouping notes around a common topic.
        </DialogContentText>
        <Input placeholder="Notebook name" onChange={handleChange} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <OutlinedButton type="button" onClick={handleClose}>
          Cancel
        </OutlinedButton>
        <ContainedButton
          type="submit"
          disabled={inputValue === ""}
          onClick={handleSubmit}
        >
          Create
        </ContainedButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNotebookDialog;

const Dialog = styled(MuiDialog)`
  user-select: none;

  ${Input} {
    margin-top: 12px;
    width: 100%;
  }

  .MuiDialogActions-root {
    margin-right: 12px;
  }
`;
