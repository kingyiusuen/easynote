import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";

const NoNotesMessage = () => {
  return (
    <Wrapper>
      <Message>No Notes</Message>
    </Wrapper>
  );
};

export default NoNotesMessage;

const Wrapper = styled.div`
  ${flexCenter}
  height: calc(100vh - 54px - 50px);
`;

const Message = styled.div`
  font-size: 32px;
  color: #9b9a9a;
`;
