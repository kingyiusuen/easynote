import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav/Nav";
import NoteList from "../components/NoteList";
import Editor from "../components/Editor";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 200px 300px calc(100vw - 200px - 300px);

  @media (min-width: 1050px) {
    grid-template-columns: 240px 380px calc(100vw - 240px - 380px);
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Nav />
      <NoteList />
      <Editor />
    </Wrapper>
  );
};

export default Home;
