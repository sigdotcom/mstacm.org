import React from "react";

import styled, { AnyStyledComponent } from "styled-components";
import { QuickAccess } from "./quickAccess";

const SideBarWrapper: AnyStyledComponent = styled.div`
  width: 0;
  height: 100%;
  background: #087ABB;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 3.125rem 3.125rem 0;
  padding-bottom: 2rem;
  transition: width .2s ease-out;

  @media all and (min-width: 768px) {
    width: 30rem;
  }
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
  }

  a:active {
    a {
      background: white;
    }

    span {
      color: #087ABB;
    }
  }

  a:hover, a:focus {
    background: white;

    span {
      color: #087ABB;
    }
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
      <LinksWrapper>
        {children}
      </LinksWrapper>
      <div style={{ height: "100%" }} />
      <QuickAccess />
    </SideBarWrapper>
  );
};
