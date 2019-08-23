import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

const httpLink: any = createHttpLink({
  uri: "http://localhost/graphql"
});

const authLink: any = setContext((_: any, { headers }: any) => {
  // get the authentication token from local storage if it exists
  // const token: any = localStorage.getItem("token");
  const token: string = "";
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
