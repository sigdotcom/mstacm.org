import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";

const client: any = new ApolloClient({
  uri: "http://localhost/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
