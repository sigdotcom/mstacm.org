import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Icon from "react-eva-icons";

import { SideBar } from "./components/Navigation/sideBar";
import { ProfilePage } from "./components/ProfilePage";
import { EventRegistration } from "./components/EventRegistration";
import { config } from "./config";
import "./static/css/App.css";

import { useAuth0 } from "./utils/react-auth0-wrapper";
import styled, { AnyStyledComponent } from "styled-components";

const Layout: AnyStyledComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background: white;
  font-family: "Nunito Sans";
`;

const MainContent: React.FC = (): JSX.Element => {
  return (
    <Switch>
      {/* <Route exact={true} path="/" component={SubmitResume} /> */}
      <Route exact={true} path="/" component={ProfilePage} />
      <Route exact={true} path="/attend/:eventId" component={EventRegistration} />
    </Switch>
  );
};

const App: React.FC = (): JSX.Element => {
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

  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   } else if (isAuthenticated) {
  //     const setToken: () => void = async (): Promise<void> => {
  //       const token: string = (await getTokenSilently()) || "";
  //       localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
  //     };
  //     setToken();
  //   } else {
  //     const fn: any = async (): Promise<void> => {
  //       await loginWithRedirect({
  //         appState: { targetUrl: window.location.origin }
  //       });
  //     };
  //     fn();
  //   }
  // }, [loading, isAuthenticated, loginWithRedirect, getTokenSilently]);

  // const onLogoutClick: () => void = (): void => {
  //   logout({ returnTo: config.REDIRECT_PAGE_URI });
  // };

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Layout>
        <SideBar>
          <li>
            <Link to="/">
              <Icon
                name="calendar-outline"
                size="medium"
              />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Icon
                name="people-outline"
                size="medium"
              />
              <span>Settings</span>
            </Link>
          </li>
        </SideBar>
        <MainContent />
      </Layout>
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
