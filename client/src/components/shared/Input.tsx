import styled from "styled-components";

const Input = styled.input`
  font-size: 15px;
  height: 40px;
  background-color: var(--notelist-background);
  border: 1px solid var(--notelist-background);
  padding: 4px 12px;
  border-radius: 6px;
  color: #828384;
  margin-bottom: 6px;

  &:focus {
    outline: none;
  }
`;

export default Input;
