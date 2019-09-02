import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

const LoadContainer: AnyStyledComponent = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;

  margin-right: 0.5rem;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader: React.SFC<{}> = (): JSX.Element => {
  return (
    <LoadContainer>
      <div />
      <div />
      <div />
      <div />
    </LoadContainer>
  );
};
