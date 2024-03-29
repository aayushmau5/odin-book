import styled from "styled-components";

interface PaddingMargin {
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

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

export const CommonButton = styled.button<PaddingMargin>`
  background: var(--dark-gray);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--font);
  font-family: inherit;
  display: block;
  transition: 0.1s ease-in;
  font-size: 1.3rem;
  padding-top: ${(props) => props.paddingTop || "10px"};
  padding-bottom: ${(props) => props.paddingBottom || "10px"};
  padding-left: ${(props) => props.paddingLeft || "15px"};
  padding-right: ${(props) => props.paddingRight || "15px"};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  margin-right: ${(props) => props.marginRight || "0"};
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

export const SmallButton = styled.button`
  background: var(--dark-gray);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: var(--font);
  font-family: inherit;
  display: block;
  margin-top: 10px;
  transition: 0.1s ease-in;
  padding: 5px 10px;
  font-size: 1rem;
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

export const SocialButton = styled.button`
  background: transparent;
  color: ${(props: { liked?: boolean }) =>
    props.liked ? "var(--light-red)" : "var(--light-gray)"};
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    color: var(--light-red);
  }

  svg {
    transform: translateY(5px);
  }
`;
