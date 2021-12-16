import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import CreateNotebookDialog from "./CreateNotebookDialog";
import { useDispatch } from "react-redux";
import { useGetActiveNotebookId, useReduxSelector } from "../../hooks";
import { flexCenter, scrollable, baseIconButton } from "../../styles/mixins";
import { logout } from "../../actions/session.action";
import AllNotesOption from "./AllNotesOption";
import NotebookOption from "./NotebookOption";
import ArrowTooltip from "../shared/ArrowTooltip";
import { UIContext } from "../../contexts";

const BaseSidebar = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const notebookId = useGetActiveNotebookId();
  const notebooks = useReduxSelector((state) => state.notebook);
  const user = useReduxSelector((state) => state.session.user);

  return (
    <Container>
      <List>
        <AllNotesOption $active={notebookId === "all"} />
        <Heading>
          <HeadingLeft>
            <BiBook />
            <TextWrapper>Notebooks</TextWrapper>
          </HeadingLeft>
          <ArrowTooltip title="Create notebook" placement="right">
            <IconButton onClick={() => setOpenDialog(true)}>
              <AiOutlinePlusCircle />
            </IconButton>
          </ArrowTooltip>
        </Heading>

        {notebooks.ids &&
          notebooks.ids.map((id) => (
            <NotebookOption
              key={id}
              notebook={notebooks.entities[id]}
              $active={notebookId === id}
            />
          ))}
      </List>
      <Footer>
        <span>{user?.username}</span>
        <ArrowTooltip title="Logout" placement="right">
          <IconButton onClick={() => dispatch(logout())}>
            <RiLogoutCircleRLine />
          </IconButton>
        </ArrowTooltip>
      </Footer>
      <CreateNotebookDialog open={openDialog} setOpen={setOpenDialog} />
    </Container>
  );
};

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(UIContext);

  return (
    <>
      <Drawer
        anchor="left"
        variant="temporary"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { width: "240px", border: "none" },
        }}
      >
        <BaseSidebar />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": { width: "240px", border: "none" },
        }}
      >
        <BaseSidebar />
      </Drawer>
    </>
  );
};

export default Sidebar;

const Container = styled.div`
  background-color: var(--sidebar-background);
  user-select: none;
`;

const List = styled.div`
  ${scrollable};
  padding: 18px 0;
  height: calc(100vh - 60px);
`;

const TextWrapper = styled.span`
  font-size: 15px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 36px;
  color: var(--sidebar-text-muted);

  & svg {
    ${flexCenter}
    font-size: 20px;
  }
`;

const HeadingLeft = styled.div`
  display: flex;
  gap: 7px;
`;

const IconButton = styled.button`
  ${baseIconButton}
  font-size: 20px;
  margin-left: auto;
  color: var(--sidebar-text-muted);

  &:hover {
    color: var(--sidebar-text-normal);
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  height: 60px;
  padding: 0px 16px;
  color: var(--sidebar-text-normal);
  background-color: #0c0f13;
`;
