import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import NoteList from "../components/NoteList/NoteList";
import Editor from "../components/Editor/Editor";
import PreLoader from "../components/PreLoader/PreLoader";
import {
  useGetActiveNotebook,
  useReduxSelector,
  useToggleItem,
} from "../hooks";
import { fetchUserNotebooks } from "../actions/session.action";
import { UIContext } from "../contexts";

const Home = () => {
  // Fetch notebooks and show loading screen for at least 0.5 seconds
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useReduxSelector((state) => state.session.user);
  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dispatch(fetchUserNotebooks(user.id));
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [user]);

  // Redirect when notebook id in URL does not exist in database
  const notebook = useGetActiveNotebook();
  const navigate = useNavigate();
  useEffect(() => {
    if (!notebook) {
      navigate("/home/all");
    }
  }, [isLoading]);

  const note = useReduxSelector(
    (state) => state.note.entities[state.note.activeId]
  );

  // Handle responsive layout
  const [isSidebarOpen, toggleSidebar] = useToggleItem(false);
  const [isNoteListOpen, toggleNoteList] = useToggleItem(true);

  if (isLoading) return <PreLoader />;

  return (
    <UIContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isNoteListOpen, toggleNoteList }}
    >
      <Container>
        {notebook && (
          <>
            <Sidebar />
            <NoteList />
            {note && <Editor />}
          </>
        )}
      </Container>
    </UIContext.Provider>
  );
};

export default Home;

const Container = styled.div`
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 100vw;

  @media (min-width: 810px) {
    grid-template-columns: 340px calc(100vw - 340px);
  }

  @media (min-width: 1200px) {
    grid-template-columns: 240px 380px calc(100vw - 240px - 380px);
  }
`;
