import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  //margin: 0.85em 0.85em 0 0;
  margin: 0 auto;
  color: #302D2D;
  background: #E5E5E5;
  border: 1px solid #070707;
  border-radius: 3px;

  :focus {
    border: 1px solid #070707;
    outline-offset: 0;
    outline: none;
  }
`

export default Input;