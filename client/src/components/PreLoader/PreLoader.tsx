import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";

const Wrapper = styled.div`
  background-color: #f5f5f4;
  height: 100vh;
  user-select: none;
  ${flexCenter}
  flex-direction: column;
  gap: 32px;
`;

const PreLoader = () => {
  return (
    <Wrapper>
      <MoonLoader />
      <div>Loading</div>
    </Wrapper>
  );
};

export default PreLoader;
