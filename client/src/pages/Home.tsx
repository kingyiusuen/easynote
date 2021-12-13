import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Nav from "../components/Nav/Nav";
import NoteList from "../components/NoteList";
import Editor from "../components/Editor";
import { useReduxSelector } from "../hooks";
import { fetchUserNotebooks } from "../actions/notes.action";

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
  const user = useReduxSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserNotebooks(user.id));
    }
  }, []);

  return (
    <Container>
      <Nav />
      <NoteList />
      <Editor />
    </Container>
  );
};

export default Home;