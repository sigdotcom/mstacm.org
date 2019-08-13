import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

import { PageConstraint } from "../../../common/PageConstraint";

const BG = styled.div`
  height: 120px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 85px;
  height: 85px;
`;

const MenuItems = styled.div`
  display: none;

  @media screen and (min-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 340px;
    margin-left: 30px;
  }
`;

const MenuItem = styled.div`
  color: #376b83;
  font-weight: 600;
  font-size: 18px;
  padding: 5px 10px;
`;

const SignIn = styled.button`
  transition: 0.2s ease-in-out;
  font-weight: bold;
  border-radius: 30px;
  padding: 10px 40px
  font-size: 17px;
  color: #2d9cdb;
  border: 3px solid #2d9cdb;
  cursor: pointer;
  &:hover {
    background: #2d9cdb;
    color: #fff;
  }
`;

const NavRow: any = styled.nav`
  display: flex;
`;

const Nav: React.FC<{}> = () => {
  const handleSignIn = () => {};

  return (
    <BG>
      <PageConstraint>
        <Wrapper>
          <NavRow>
            <Logo src={require("../../../../static/img/acm-logo.png")} />
            <MenuItems>
              <Link to="about" smooth={true}>
                <MenuItem>About</MenuItem>
              </Link>
              <Link to="groups" smooth={true}>
                <MenuItem>Groups</MenuItem>
              </Link>
              <Link to="events" smooth={true}>
                <MenuItem>Events</MenuItem>
              </Link>
              <Link to="sponsors" smooth={true}>
                <MenuItem>Sponsors</MenuItem>
              </Link>
            </MenuItems>
          </NavRow>
          <SignIn onClick={handleSignIn}>SIGN IN</SignIn>
        </Wrapper>
      </PageConstraint>
    </BG>
  );
};

export { Nav };
