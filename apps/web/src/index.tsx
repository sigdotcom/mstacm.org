import { ApolloProvider } from "@apollo/react-hooks";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";
import { config } from "./config";
import registerServiceWorker from "./registerServiceWorker";
import { client } from "./utils/apollo";
import { Auth0Provider, onRedirectCallback } from "./utils/react-auth0-wrapper";

import "./static/css/App.css";

ReactDOM.render(
  <Auth0Provider
    domain={config.AUTH0_DOMAIN}
    client_id={config.AUTH0_CLIENT_ID}
    redirect_uri={window.location.origin}
    audience={config.AUTH0_AUDIENCE}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
