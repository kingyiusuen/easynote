import React from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContainedButton from "./ContainedButton";
import OutlinedButton from "./OutlinedButton";
import Input from "../shared/Input";

const StyledDialog = styled(Dialog)`
  user-select: none;

  ${Input} {
    margin-top: 12px;
    width: 100%;
  }

  .MuiDialogActions-root {
    margin-right: 12px;
  }
`;

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormDialog = ({ open, setOpen }: Props) => {
  //const handleClickOpen = () => {
  //  setOpen(true);
  //};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Create new notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notebooks are useful for grouping notes around a common topic.
          </DialogContentText>
          <form>
            <Input placeholder="Notebook name" />
          </form>
        </DialogContent>
        <DialogActions>
          <OutlinedButton onClick={handleClose}>Cancel</OutlinedButton>
          <ContainedButton onClick={handleClose}>Create</ContainedButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default FormDialog;
