import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import { SubmitResume } from "./components/SubmitResume";
import { EventRegistration } from "./components/EventRegistration";
import { config } from "./config";
import "./static/css/App.css";

import { useAuth0 } from "./utils/react-auth0-wrapper";

import { Layout, Menu, PageHeader, Spin } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const MainContent: React.SFC = (): JSX.Element => {
  return (
    <Switch>
      <Route exact={true} path="/" component={SubmitResume} />
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
    logout,
    user
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

  const onLogoutClick: () => void = (): void => {
    logout({ returnTo: config.REDIRECT_PAGE_URI });
  };

  if (loading || !isAuthenticated) {
    return <Spin size="large" className="load-page" tip="Loading..." />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          onBreakpoint={undefined}
          onCollapse={undefined}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["resume"]}>
            <Menu.Item key="resume">
              <Link to="/">
                <span className="nav-text">Submit Resume</span>
              </Link>
            </Menu.Item>
            <Menu.Item onClick={onLogoutClick} key="signOut">
              <span className="nav-text">Sign Out</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <PageHeader
              backIcon={false}
              title={`Hello, ${user.name}. Welcome to your Dashboard`}
            />
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <MainContent />
          </Content>
          <Footer style={{ textAlign: "center" }}>S&T ACM { new Date().getFullYear() }</Footer>
        </Layout>
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
