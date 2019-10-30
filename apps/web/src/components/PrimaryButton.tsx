import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { Loader } from "./Loader";

const Button: AnyStyledComponent = styled.button`
  display: flex;
  align-contents: center;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in-out;

  background: #42c0fc;
  color: #fff;

  border: none;
  border-radius: 30px;

  font-size: 17px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;

  padding: 0 40px;

  line-height: 50px;
  text-align: center;

  cursor: pointer;

  vertical-align: top;
  transition: 0.2s ease-in-out all;

  &:hover {
    background: #1290cc;
    color: #fff;
  }

  //   :disabled {
  //     opacity: 0.5;
  //     cursor: not-allowed;
  //   }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// Causes NotFoundError: Node was not found
export const PrimaryButton: React.SFC<ButtonProps> = (
  props: ButtonProps
): JSX.Element => {
  // Need span wrapped due to https://github.com/dimitrisraptis96/react-eva-icons/issues/2
  return (
    <Button {...props}>
      {props.loading && <Loader />}
      {props.children}
    </Button>
  );
};
