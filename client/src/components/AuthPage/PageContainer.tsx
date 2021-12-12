import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/mixins";

const Wrapper = styled.div`
  background-color: #f5f5f4;
  height: 100vh;
  user-select: none;
  ${flexCenter}
`;

const Container = styled.div`
  width: 350px;
  padding: 24px;
  border-radius: 8px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
`;

const PageContainer: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default PageContainer;
