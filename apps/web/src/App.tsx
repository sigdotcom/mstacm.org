import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage, NotFoundPage } from "./components/pages";
import { config } from "./config";
import { useAuth0 } from "./utils/react-auth0-wrapper";

import "./static/css/App.css";

const App: React.FC<{}> = (): JSX.Element => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
    };

    setToken();
  }, [loading, isAuthenticated, getTokenSilently]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
