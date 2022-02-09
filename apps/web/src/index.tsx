import { ApolloProvider } from "@apollo/react-hooks";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { StripeProvider } from "react-stripe-elements";
import { toast } from "react-toastify";
import { App } from "./App";
import { config } from "./config";
import registerServiceWorker from "./registerServiceWorker";
import { client } from "./utils/apollo";
import { Auth0Provider } from "@auth0/auth0-react";
import { onRedirectCallback } from "./utils/react-auth0-wrapper";

import "react-toastify/dist/ReactToastify.min.css";
import "./static/css/App.css";

toast.configure({
  position: "top-center",
  hideProgressBar: true
});

ReactDOM.render(
  <Auth0Provider
    domain={config.AUTH0_DOMAIN}
    clientId={config.AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={config.AUTH0_AUDIENCE}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloProvider client={client}>
      <StripeProvider apiKey={config.STRIPE_PUBLIC_KEY}>
        <App />
      </StripeProvider>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
