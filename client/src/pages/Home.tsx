import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import NoteList from "../components/NoteList/NoteList";
import Editor from "../components/Editor/Editor";
import PreLoader from "../components/PreLoader/PreLoader";
import { useReduxSelector } from "../hooks";
import { fetchUserNotebooks } from "../actions/session.action";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      dispatch(fetchUserNotebooks(user.id));
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  const user = useReduxSelector((state) => state.session.user);
  const note = useReduxSelector(
    (state) => state.note.entities[state.note.activeId]
  );

  return isLoading ? (
    <PreLoader />
  ) : (
    <Container>
      <Sidebar />
      <NoteList />
      {note && <Editor note={note} />}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 200px 300px calc(100vw - 200px - 300px);

  @media (min-width: 1050px) {
    grid-template-columns: 240px 380px calc(100vw - 240px - 380px);
  }
`;
