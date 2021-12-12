import React from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { flexCenter } from "../../styles/mixins";

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  color: #394053;
`;

const Heading = styled.h1`
  font-size: 24px;
`;

const Subheading = styled.h2`
  font-size: 16px;
  font-weight: 400;
  padding: 8px 0 12px 0;
`;

const IconWrapper = styled.div`
  font-size: 36px;
  width: 60px;
  height: 60px;
  ${flexCenter}
`;

const Header = () => {
  return (
    <Container>
      <IconWrapper>
        <FaPen />
      </IconWrapper>
      <Heading>Easynote</Heading>
      <Subheading>Make note-taking easy</Subheading>
    </Container>
  );
};

export default Header;
