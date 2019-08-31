import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage, NotFoundPage } from "./components/pages";
import { config } from "./config";
import "./static/css/App.css";
import { Auth0Provider, onRedirectCallback } from "./utils/react-auth0-wrapper";

localStorage.debug = "oasis:*";

const App: React.FC<{}> = (): JSX.Element => {
  return (
    <Auth0Provider
      domain={config.AUTH0_DOMAIN}
      client_id={config.AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      audience={config.AUTH0_AUDIENCE}
      onRedirectCallback={onRedirectCallback}
    >
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Auth0Provider>
  );
};

export { App };
