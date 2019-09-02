import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

const Button: AnyStyledComponent = styled.button`
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

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: React.SFC<ButtonProps> = (
  props: ButtonProps
): JSX.Element => {
  return <Button {...props}>{props.children}</Button>;
};
