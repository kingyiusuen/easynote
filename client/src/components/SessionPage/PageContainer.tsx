import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";

const PageContainer: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default PageContainer;

const Wrapper = styled.div`
  background-color: var(--notelist-background);
  height: 100vh;
  user-select: none;
  ${flexCenter}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 8px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;

  @media (min-width: 600px) {
    width: 350px;
    height: unset;
  }
`;
