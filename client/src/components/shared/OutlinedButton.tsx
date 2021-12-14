import styled from "styled-components";
import { baseButton } from "../../styles/mixins";

const OutlinedButton = styled.button`
  ${baseButton}
  font-size: 15px;
  margin: 8px 0;
  padding: 10px 16px;
  color: #394053;
  background-color: white;
  border: 1px solid #394053;

  &:hover {
    background-color: #edeff4;
  }
`;

export default OutlinedButton;
