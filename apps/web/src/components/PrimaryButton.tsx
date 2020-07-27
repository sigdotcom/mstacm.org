import React from "react";
import styled, { AnyStyledComponent, keyframes } from "styled-components";

import { Loader } from "./Loader";

const shakeKeyframe = keyframes`
  0% { transform: translateX(-5px); }
  20% { transform: translateX(10px); }
  35% { transform: translateX(-10px); }
  45% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  55% { transform: translateX(10px); }
  65% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(-5px); }
`;

const Button: AnyStyledComponent = styled.button`
  position: relative;
  display: flex;
  align-contents: center;
  align-items: center;
  justify-content: center;

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
  outline: none;

  vertical-align: top;
  transition: 0.2s ease-in-out all;

  &:hover {
    background: #1290cc;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    box-shadow: 0 0 5pt 2pt #83D7ff;
  }

  &.shake {
    background: red;
    transition: 100ms ease-in-out background;
    animation: 300ms ${shakeKeyframe} ease-out;
  }

  &::after {
    content: "";
    background: #42c0fc;
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .2s;
  }

  &:hover::after {
    transform: scaleX(1.2) scaleY(1.4);
    opacity: 0;
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  shake?: boolean;
};

// Causes NotFoundError: Node was not found
export const PrimaryButton: React.SFC<ButtonProps> = (
  props: ButtonProps
): JSX.Element => {
  // Need span wrapped due to https://github.com/dimitrisraptis96/react-eva-icons/issues/2
  return (
    <Button
      className={`${props.shake ? "shake" : ""} ${props.className}`}
      onClick={props.onClick}
    >
      {props.loading && <Loader />}
      {props.children}
    </Button>
  );
};
