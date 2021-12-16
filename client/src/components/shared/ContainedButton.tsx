import styled from "styled-components";
import { baseButton } from "../../styles/mixins";

const ContainedButton = styled.button`
  ${baseButton}
  font-size: 15px;
  margin: 8px 0;
  padding: 10px 16px;
  color: white;
  background-color: ${({ disabled }) =>
    disabled ? "#6d7a9d" : "var(--brand)"};
  border: 1px solid ${({ disabled }) => (disabled ? "#6d7a9d" : "var(--brand)")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#6d7a9d" : "#282c39")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

export default ContainedButton;
