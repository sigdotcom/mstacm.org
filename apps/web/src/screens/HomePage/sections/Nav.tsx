import React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

import { PageConstraint } from "../../../components/PageConstraint";
import { useAuth0 } from "../../../utils/react-auth0-wrapper";

import { config } from "../../../config";

import { ProfileOptions } from "./ProfileOptions";

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
  background-color: #f4f5f8;
  z-index: 1337;
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

const NavRow = styled.nav`
  display: flex;
`;

const Nav: React.FC<{}> = (): JSX.Element => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const onClick: () => void = isAuthenticated
    ? (): void => logout({ returnTo: window.location.origin })
    : async (): Promise<void> => loginWithRedirect({});

  return (
    <BG>
      <PageConstraint>
        <Wrapper>
          <NavRow>
            <Logo src={`${config.CDN_URI}/static/acm-logo.png`} />
            <MenuItems>
              <Link to="communities" smooth={true}>
                <MenuItem>Communities</MenuItem>
              </Link>
              <Link to="events" smooth={true}>
                <MenuItem>Events</MenuItem>
              </Link>
              <Link to="sponsors" smooth={true}>
                <MenuItem>Sponsors</MenuItem>
              </Link>
              <Link to="membership" smooth={true}>
                <MenuItem>Membership</MenuItem>
              </Link>
            </MenuItems>
          </NavRow>
          {isAuthenticated ? (
            <ProfileOptions />
          ) : (
            <SignIn onClick={onClick}>Sign In</SignIn>
          )}
        </Wrapper>
      </PageConstraint>
    </BG>
  );
};

export { Nav };
