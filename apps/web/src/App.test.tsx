import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { config } from "./config";
import { client } from "./utils/apollo";
import { Auth0Provider } from "@auth0/auth0-react";
import { onRedirectCallback } from "./utils/react-auth0-wrapper";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Auth0Provider
      domain={config.AUTH0_DOMAIN}
      clientId={config.AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={config.AUTH0_AUDIENCE}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Auth0Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
