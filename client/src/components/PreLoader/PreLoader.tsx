import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";

const PreLoader = () => {
  return (
    <Wrapper>
      <MoonLoader />
      <div>Loading</div>
    </Wrapper>
  );
};

export default PreLoader;

const Wrapper = styled.div`
  background-color: var(--notelist-background);
  height: 100vh;
  user-select: none;
  ${flexCenter}
  flex-direction: column;
  gap: 32px;
`;
