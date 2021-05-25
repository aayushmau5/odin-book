import styled from "styled-components";

export const Button = styled.button`
  background: var(--dark-gray);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--font);
  font-family: inherit;
  display: block;
  margin: 10px auto;
  transition: 0.1s ease-in;
  padding: 10px 15px;
  font-size: 1.3rem;
  &:hover {
    background: var(--light-red);
  }
  &:active {
    background: var(--red);
  }
`;

export const ErrorDiv = styled.div`
  color: var(--light-red);
  font-size: 1rem;
`;
