import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

import { config } from "../config";

const httpLink: HttpLink = new HttpLink({
  uri: config.API_URI
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // Get access token from local storage
  const token = localStorage.getItem(config.ACCESS_TOKEN_KEY) || null;

  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }));

  return forward(operation);
})

export const client: ApolloClient<{}> = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});
