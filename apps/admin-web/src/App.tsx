import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Layout, Menu, PageHeader, Spin } from "antd";

import { ToolList } from "./components/pages";
import { Events } from "./components/pages/tools";
import { Membership } from "./components/pages/tools/Membership";
import { config } from "./config";
import "./static/css/App.css";

import { useSuperUserQuery } from "./generated/graphql";

import { useAuth0 } from "./utils/react-auth0-wrapper";

const { Header, Content, Footer, Sider } = Layout;

const Forbidden: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>403 Forbidden</h1>
      <p style={{ textAlign: "center" }}>
        It appears your permissions prevent me from letting you pass.
        <br />
        Please contact <a href="mailto:acm@mst.edu">acm@mst.edu</a> if you
        believe this is a mistake.
      </p>
    </div>
  );
};

const MainContent: React.SFC<{}> = (): JSX.Element => {
  return (
    <Switch>
      <Route exact={true} path="/" component={ToolList} />
      <Route path="/events" component={Events} />
      <Route path="/membership" component={Membership} />
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

  const { loading: suLoading, error } = useSuperUserQuery();
  const [forbidden, setForbidden] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

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
        console.log(token);
        localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
      };

      setToken();
    }

    if (localStorage.getItem(config.ACCESS_TOKEN_KEY)) {
      if (suLoading) {
        return;
      } else if (error && !forbidden) {
        console.log(JSON.stringify(error));
        setForbidden(error.graphQLErrors[0].message.includes("Access denied!"));
      } else if (suLoading === false && !fetched) {
        setFetched(true);
      }
    }
  }, [
    error,
    fetched,
    forbidden,
    loginWithRedirect,
    suLoading,
    loading,
    isAuthenticated,
    getTokenSilently,
  ]);

  const onLogoutClick: () => void = (): void => {
    logout({ returnTo: config.REDIRECT_PAGE_URI });
  };

  if (loading || !isAuthenticated) {
    return <Spin size="large" className="load-page" tip="Loading..." />;
  } else if (forbidden) {
    return <Forbidden />;
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
