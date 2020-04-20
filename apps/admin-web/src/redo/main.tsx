import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
// import { ProfileOptions } from "../redo/profile";
const Test: AnyStyledComponent = styled.div`
  width: 100%;
  background-color: red;
  height: 100%;
  overflow: hidden;
`;

function Main() {
  return <Test>g</Test>;
}

export default Main;
