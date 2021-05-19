import styled from "styled-components";

export const Button = styled.button`
  background: var(--gray);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--font);
  outline-offset: 4px;
  font-family: inherit;
  margin: 10px;
  transition: 0.1s ease-in;
  padding: 5px 10px;
  font-size: 1.2rem;
  &:hover {
    background: var(--light-red);
    outline: 2px solid var(--light-red);
  }
  &:active {
    background: var(--red);
    outline-color: var(--red);
  }
`;
