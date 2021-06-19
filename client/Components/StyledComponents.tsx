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
  &:focus {
    outline: 2px solid var(--red);
  }
  &:active {
    background: var(--red);
  }
`;

export const ErrorDiv = styled.div`
  color: var(--light-red);
  font-size: 1rem;
`;

export const UserErrorDiv = styled.div`
  background: var(--light-red);
  background-opacity: 0.5;
  outline: 3px solid var(--light-red);
  outline-offset: 5px;
  border-radius: 5px;
  width: 80%;
  padding: 10px 5px;
  text-align: center;
  font-size: 1.3rem;
  margin: 0 auto 25px auto;
  color: white;
`;
