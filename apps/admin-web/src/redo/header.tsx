import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { ProfileOptions } from "../redo/profile";
import Logo1 from "./logo.png";

const Nav: AnyStyledComponent = styled.nav`
  background-color: #fff;
  height: 90px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Background: AnyStyledComponent = styled.div`
  background-color: #e5e5e5;
`;
//const Navlist: AnyStyledComponent = styled.ul``;
const List: AnyStyledComponent = styled.li`
  padding: 4px;
`;
const Acm: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
`;
const Acmtext: AnyStyledComponent = styled.div`
  font-size: 24px;
  color: #2d9cdb;
  font-weight: bold;
  padding-left: 10px;
`;
const Acmbread: AnyStyledComponent = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
`;
const Breadcrumb: AnyStyledComponent = styled.ul`
  display: flex;
  padding-left: 20px;
  align-items: center;
  list-style: none;
  height: 100%;
`;
const Link: AnyStyledComponent = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    color: #555555;
  }
  transition: all 0.1s ease-in-out;
`;
const Constraint: AnyStyledComponent = styled.div`
  display: flex;
  height: 100%;
  width: 1200px;
  margin: auto;
`;
const Login: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo: AnyStyledComponent = styled.img`
  width: 56px;
  height: 56px;
`;

function Head() {
  return (
    <Background>
      <Nav>
        <Constraint>
          <Acmbread>
            <Acm>
              <Logo src={Logo1} />
              <Acmtext>S&amp;T ACM</Acmtext>
            </Acm>

            <Breadcrumb>
              <List>
                <Link href="https://clay.sh/">Dashboard</Link>
              </List>
              <List>/</List>
              <List>
                <Link href="https://clay.sh/">Events</Link>
              </List>
            </Breadcrumb>
          </Acmbread>
          <Login>
            <ProfileOptions />
          </Login>
        </Constraint>
      </Nav>
    </Background>
  );
}

export default Head;
