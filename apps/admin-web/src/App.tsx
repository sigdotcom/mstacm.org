import React, { useEffect } from "react";

import { Spin } from "antd";
import "./static/css/App.css";
import { BrowserRouter } from "react-router-dom";

import styled, { AnyStyledComponent } from "styled-components";
import { config } from "./config";
import "./static/css/App.css";
import { useAuth0 } from "./utils/react-auth0-wrapper";
import Sidebar from "./redo/Sidebar";

import Main from "./redo/Main";

const Grid: AnyStyledComponent = styled.div`
  height: 100%;
  display: grid;
  width: 100%;
  margin: auto;

  grid-template-columns: 115px 115px repeat(14, 1fr);

  grid-template-areas: "m m c c c c c c c c c c c c c c";
  @media (max-width:  1500px) {
    grid-template-columns: 1fr
    grid-template-areas: 
            "m"
            "c";
    grid-template-rows: repeat(2, 1fr);
    
  }
`;

const Content: AnyStyledComponent = styled.div`
  grid-area: c;
  @media (max-width: 1500px) {
    grid-row: 1;
  }
`;
const Menu: AnyStyledComponent = styled.div`
  grid-area: m;
`;

const App: React.SFC<{}> = (): JSX.Element => {
  const {
    loading,
    isAuthenticated,
    getTokenSilently,
    loginWithRedirect,
    // logout,
  } = useAuth0();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAuthenticated) {
      const fn: any = async (): Promise<void> => {
        await loginWithRedirect({
          appState: { targetUrl: window.location.href },
        });
      };

      fn();
    } else {
      const setToken: () => void = async (): Promise<void> => {
        const token: string = (await getTokenSilently()) || "";
        localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
      };

      setToken();
    }
  }, [loading, isAuthenticated, getTokenSilently]);

  // const onLogoutClick: () => void = (): void => {
  //   logout({ returnTo: config.REDIRECT_PAGE_URI });
  // };

  if (loading || !isAuthenticated) {
    return <Spin size="large" className="load-page" tip="Loading..." />;
  }

  return (
    <BrowserRouter>
      <Grid>
        <Content>
          <Main />
        </Content>
        <Menu>
          <Sidebar />
        </Menu>
      </Grid>
    </BrowserRouter>
  );
};

export { App };
