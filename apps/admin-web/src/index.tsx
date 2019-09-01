import React from "react";
import ReactDOM from "react-dom";
import { setGlobal } from "reactn";

import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { config } from "./config";

setGlobal({
  events: [],
  eventFormVisible: false,
  activeEvent: undefined
});

const httpLink: any = createHttpLink({
  uri: config.GRAPHQL_URL
});

const authLink: any = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  const token: string | null = localStorage.getItem(config.TOKEN_STORAGE_KEY);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client: any = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
