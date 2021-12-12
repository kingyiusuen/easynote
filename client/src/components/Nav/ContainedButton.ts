import styled from "styled-components";
import { baseButton } from "../../styles/mixins";

const ContainedButton = styled.button`
  ${baseButton}
  font-size: 15px;
  margin: 8px 0;
  padding: 10px 16px;
  color: white;
  background-color: ${({ disabled }) => (disabled ? "#6d7a9d" : "#394053")};

  &:hover {
    background-color: #313647;
  }
`;

export default ContainedButton;
