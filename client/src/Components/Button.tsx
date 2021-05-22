import styled from "styled-components";

export const Button = styled.button`
  background: var(--background);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--font);
  font-family: inherit;
  margin: 10px auto;
  transition: 0.1s ease-in;
  padding: 5px 10px;
  font-size: 1.2rem;
  &:hover {
    background: var(--light-red);
  }
  &:active {
    background: var(--red);
  }
`;
