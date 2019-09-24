import React from "react";
import Icon from "react-eva-icons";

import styled, { AnyStyledComponent } from "styled-components";

import { IconContainer } from "./IconContainer";

const ToastContainer: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  alignt-content: center;

  .Toastify__toast-container--top-center {
    margin-left: 100px;
  }
`;

const Message: AnyStyledComponent = styled.div`
  color: rgba(0, 0, 0, 0.65);
  margin: 8px;
`;

export interface IToastProps {
  iconName: string;
  fill: string;
  message: string;
}

export const Toast: React.FC<IToastProps> = (
  props: IToastProps
): JSX.Element => {
  return (
    <ToastContainer>
      <IconContainer>
        <Icon name={props.iconName} size="medium" fill={props.fill} />
      </IconContainer>
      <Message>{props.message}</Message>
    </ToastContainer>
  );
};
