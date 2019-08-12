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
  const token: string =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwZjQwNjBlNThkNzVmZDNmNzBiZWZmODhjNzk0YTc3NTMyN2FhMzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDgyMTA4MjEwMTE1LWphdWp2YzA4dWVpaXBvcWdxZjBwMDNqbm5jdDBuMTRmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDgyMTA4MjEwMTE1LWphdWp2YzA4dWVpaXBvcWdxZjBwMDNqbm5jdDBuMTRmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExOTk4MjI5MjcxNzE4NDExMzIzIiwiaGQiOiJ1bXN5c3RlbS5lZHUiLCJlbWFpbCI6ImNtbTRoZkB1bXN5c3RlbS5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImtuN0ZvVUdEVGtQMFVyMmdMTW9hVmciLCJuYW1lIjoiQ2xheSBNY0dpbm5pcyIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWpSLUFQNXpHWUpNL0FBQUFBQUFBQUFJL0FBQUFBQUFBQVZJL2lvU0lVaTBFMGF3L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJDbGF5IiwiZmFtaWx5X25hbWUiOiJNY0dpbm5pcyIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTY1NjI1OTIwLCJleHAiOjE1NjU2Mjk1MjAsImp0aSI6ImIzZjBkZDgwNmMxM2MyN2RjN2I1NDNjZDBiNzVkYzc2MzY2NTE0MmQifQ.Q_0NexxWGzb-fb4S8F4a3YE29V7o32lrATlFOQ6wtAwoxlhntEKyndTkx0ozi3SGTxEc7WS1u-5KLNiv4I0Hdt3GCyAORfe3bEob1eXi3C5ziCWnYWklwqbr5Pc96_AsJ4_uPWexm7Pi0dP7o-vtd0y1gzLn7V_aDPPSTB1Dj5qaQm4XCQIyf_6_CVxyKkL-AzcHAh5q_y4aE82BjWHzMzq8TKVbGtYn-X0o9A9oIcinp9mXL_yq3QGXk_I1dQzlFIvYk9ghBfmzQV04RQjRaur0zlgLzSX1B8rFdov2eoqClQwyf3cLZtwyHlDO395H3vGbW1g4KE-eDvH8amWWDg";
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
