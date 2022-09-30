import "./index.css";

import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

import { config } from "./config";
import { client } from "./utils/apollo";
import { Auth0Provider, onRedirectCallback } from "./utils/react-auth0-wrapper";

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
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
