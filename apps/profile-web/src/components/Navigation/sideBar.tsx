import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

import { config } from "../../config";

import { QuickAccess } from "./quickAccess";

const SideBarWrapper: AnyStyledComponent = styled.div`
  position: fixed;
  left: -20rem;
  width: 20rem;
  height: 100vh;
  background: #087ABB;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 3.125rem 3.125rem 0;
  padding-bottom: 2rem;
  transition: left .1s ease-out;
  z-index: 9;

  @media all and (min-width: 900px) {
    left: 0;
  }
`;

const FillBorderCurveBackground: AnyStyledComponent = styled.div`
  background: #F4F5F8;
  position: absolute;
  width: 100%;
  height: 4rem;
  top: 0;
  left: 0;
  z-index: -9;
`;

const LogoWrapper: AnyStyledComponent = styled.div`
  padding: 2rem 0 5.625rem 3.75rem;
  background: #087ABB;
  display: flex;
  align-items: center;
  border-radius: 0 3.125rem 0 0;
  width: 100%;
`;

const LogoImg: AnyStyledComponent = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: .625rem;
`;

const LogoText: AnyStyledComponent = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const LinksWrapper: AnyStyledComponent = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 3.625rem;
    background: #087ABB;
    padding: 0 0 0 3.75rem;
    border-radius: 2.5rem 0 0 2.5rem;
    transition: all .2s ease-in-out;
  }.navibar li.active a:hover {
  color: #b3b3b3; /*the default color*/
}

  a:focus {
    background: #F4F5F8;

    span {
      color: #087ABB;
    }

    &:hover {
      background: #F4F5F8;
    }
  }

  a:hover {
    background: #076aa3;
  }

  span {
    margin-left: .5rem;
    font-size: 20px;
    color: white;
  }
`;

export const SideBar: React.FC<{}> = ({ children }) => {
  return (
    <SideBarWrapper>
      <FillBorderCurveBackground />
      <LogoWrapper>
        <LogoImg src={`${config.CDN_URI}/static/acm-logo-white.png`} />
        <LogoText>S&T ACM</LogoText>
      </LogoWrapper>
      <LinksWrapper>
        {children}
      </LinksWrapper>
      <div style={{ height: "100%" }} />
      <QuickAccess />
    </SideBarWrapper>
  );
};
