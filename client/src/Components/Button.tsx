import styled from "styled-components";

export const Button = styled.button`
  background: var(--gray);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--font);
  outline-offset: 2px;
  font-family: inherit;
  margin: 10px;
  transition: 100ms linear;
  &:hover {
    background: var(--red);
  }
`;
