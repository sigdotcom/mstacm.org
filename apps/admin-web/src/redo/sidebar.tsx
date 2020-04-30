import React from "react";

import { Link } from "react-router-dom";
import styled, { AnyStyledComponent } from "styled-components";

import { ProfileOptions } from "./Profile";
const Center1: AnyStyledComponent = styled.div`
  padding-top: 40px;
  width: 100%;
  background-color: #087abb;
  height: 90vh;
  overflow: hidden;
  display: flex;

  color: white;
  flex-direction: column;
`;

const Side: AnyStyledComponent = styled.ul`
  padding-left: 0;
`;
const Item1: AnyStyledComponent = styled.li`
  display: flex;
  font-family: Nunito Sans;
  justify-content: center;
  background-color: #087abb;
  padding-bottom: 20px;
  font-size: 24px;
  color: white;
  &:active {
    background-color: #f4f5f8;
    color: #087abb;
  }
`;
const Item2: AnyStyledComponent = styled.li`
  display: flex;
  font-family: Nunito Sans;
  justify-content: center;
  background-color: #087abb;
  padding-bottom: 20px;
  font-size: 24px;
  color: white;
  &:active {
    background-color: #f4f5f8;
    color: #087abb;
  }
`;
const Acmtext: AnyStyledComponent = styled.div`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
`;

const Acm: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;
const Log: AnyStyledComponent = styled.div`
  height: 10vh;
  display: flex;
  font-family: Nunito Sans;
  background-color: #0d5d8b;
  align-items: center;
  padding-top: 20px;
  justify-content: center;
  z-index: 10;
`;
function Sidebar() {
  return (
    <div>
      <Center1>
        <Acm>
          <Acmtext>S&amp;T ACM</Acmtext>
        </Acm>

        <Side>
          <Link to="/events">
            <Item1>Events</Item1>
          </Link>
          <Link to="/membership">
            <Item2>Membership</Item2>
          </Link>
        </Side>
      </Center1>
      <Log>
        <ProfileOptions />
      </Log>
    </div>
  );
}

export default Sidebar;
