import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Layout, Menu, PageHeader, Spin } from "antd";

import { ToolList } from "./Tools";
import { Events } from "./screens/Events";
import { EventData } from "./screens/EventData";
import { Membership } from "./screens/Membership";
import { RedemptionCodes } from "./screens/RedemptionCodes";
import { config } from "./config";
import "./static/css/App.css";

import { useAuth0 } from "./utils/react-auth0-wrapper";

const { Header, Content, Footer, Sider } = Layout;

const NotFound: React.FC<{}> = (): JSX.Element => {
  return <h1>You are lost!</h1>;
};

const MainContent: React.SFC<{}> = (): JSX.Element => {
  return (
    <Switch>
      <Route exact={true} path="/" component={ToolList} />
      <Route path="/events" component={Events} />
      <Route path="/data/:eventId" component={EventData} />
      <Route path="/membership" component={Membership} />
      <Route path="/redemption" component={RedemptionCodes} />
      <Route component={NotFound} />
    </Switch>
  );
};

const App: React.SFC<{}> = (): JSX.Element => {
  const {
    loading,
    isAuthenticated,
    getTokenSilently,
    loginWithRedirect,
    logout,
    user,
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["events"]}>
            <Menu.Item key="events">
              <Link to="/events">
                <span className="nav-text">Events</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="membership">
              <Link to="/membership">
                <span className="nav-text">Membership Tool</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="redemption">
              <Link to="/redemption">
                <span className="nav-text">Redemption Codes</span>
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
              title={`Hello, ${user.name}. Welcome to your Admin Dashboard`}
            />
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <MainContent />
            <Footer style={{ textAlign: "center" }}>S&T ACM 2019</Footer>
          </Content>
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
