import React from "react";
import styled from "styled-components";
import { baseButton } from "../../styles/mixins";

interface Props {
  disabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Wrapper type="submit" {...props}>
      {children}
    </Wrapper>
  );
};

export default SubmitButton;

const Wrapper = styled.button`
  ${baseButton}
  font-size: 16px;
  margin: 8px 0;
  padding: 12px 16px;
  color: white;
  background-color: ${({ disabled }) => (disabled ? "#6d7a9d" : "#394053")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#6d7a9d" : "#313647")};
    cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  }
`;
