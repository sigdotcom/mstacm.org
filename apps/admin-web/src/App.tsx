import React, { useEffect } from "react";
import { Spin } from "antd";
import { BrowserRouter } from "react-router-dom";
import styled, { AnyStyledComponent } from "styled-components";
import { config } from "./config";
import "./static/css/App.css";
import { useAuth0 } from "./utils/react-auth0-wrapper";
import Sidebar from "./screens/Dashboard/Sidebar";
import Main from "./screens/Dashboard/Main";

const Grid: AnyStyledComponent = styled.div`
  height: 100vh;
  display: grid;
  width: 100vw;
  margin: auto;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: auto;
  grid-template-areas: "m m c c c c c c c c c c c c c c";
  @media (max-width:  1530px) {
    grid-template-columns: 1fr
    grid-template-areas: 
            "m"
            "c";
    grid-template-rows: repeat(2, 1fr);
    
  }
`;
// const Header: AnyStyledComponent = styled.div`
//   grid-area: h;
// `;
const Content: AnyStyledComponent = styled.div`
  grid-area: c;
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

/*
 * Future Routes
        <Route exact={true} path="/membership" component={Membership} />
        <Route exact={true} path="/sigs" component={Sigs} />
        <Route exact={true} path="/sponsors" component={Sponsors} />
        <Route exact={true} path="/products" component={Products} />
*/

export { App };
