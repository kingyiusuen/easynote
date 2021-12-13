import React from "react";
import styled from "styled-components";
import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import ContainedButton from "./ContainedButton";
import OutlinedButton from "./OutlinedButton";
import Input from "../shared/Input";
import ErrorMessage from "../shared/ErrorMessage";
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

interface FormData {
  notebookName: string;
}

const CreateNotebookDialog = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const user = useReduxSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateNotebook = (formData: FormData) => {
    if (user) {
      dispatch(
        createNotebook({ userId: user.id, name: formData.notebookName })
      );
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new notebook</DialogTitle>
        <form onSubmit={handleSubmit(handleCreateNotebook)}>
          <DialogContent>
            <DialogContentText>
              Notebooks are useful for grouping notes around a common topic.
            </DialogContentText>
            <Input
              placeholder="Notebook name"
              {...register("notebookName", {
                required: "Notebook name is required",
              })}
            />
            {errors.notebookName && (
              <ErrorMessage>{errors.notebookName.message}</ErrorMessage>
            )}
          </DialogContent>
          <DialogActions>
            <OutlinedButton onClick={handleClose}>Cancel</OutlinedButton>
            <ContainedButton type="submit">Create</ContainedButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateNotebookDialog;
