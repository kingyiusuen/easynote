import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import NoteList from "../components/NoteList/NoteList";
import Editor from "../components/Editor/Editor";
import PreLoader from "../components/PreLoader/PreLoader";
import { useReduxSelector } from "../hooks";
import { fetchUserNotebooks } from "../actions/notebooks.action";

const Container = styled.div`
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 200px 300px calc(100vw - 200px - 300px);

  @media (min-width: 1050px) {
    grid-template-columns: 240px 380px calc(100vw - 240px - 380px);
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const user = useReduxSelector((state) => state.auth.user);
  const noteIds = useReduxSelector(
    (state) => state.notebook.entities[state.notebook.activeId]?.noteIds
  );
  const activeNoteId = useReduxSelector((state) => state.note.activeId);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dispatch(fetchUserNotebooks(user.id));
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  return isLoading ? (
    <PreLoader />
  ) : (
    <Container>
      <Nav />
      <NoteList noteIds={noteIds} />
      {activeNoteId && <Editor key={activeNoteId} noteId={activeNoteId} />}
    </Container>
  );
};

export default Home;
