import React, { useState } from "react";
import styled from "styled-components";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContainedButton from "./ContainedButton";
import OutlinedButton from "./OutlinedButton";
import Input from "../shared/Input";
import { createNotebook } from "../../actions/notes.action";
import { useReduxSelector } from "../../hooks";
import { useDispatch } from "react-redux";

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

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNotebookDialog = ({ open, setOpen }: Props) => {
  const [value, setValue] = useState("");

  const handleClose = () => {
    setValue("");
    setOpen(false);
  };

  const dispatch = useDispatch();
  const user = useReduxSelector((state) => state.auth.user);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      dispatch(createNotebook({ userId: user.id, name: value }));
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new notebook</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notebooks are useful for grouping notes around a common topic.
          </DialogContentText>
          <Input placeholder="Notebook name" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <OutlinedButton type="button" onClick={handleClose}>
            Cancel
          </OutlinedButton>
          <ContainedButton
            type="submit"
            disabled={value === ""}
            onClick={handleSubmit}
          >
            Create
          </ContainedButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateNotebookDialog;
