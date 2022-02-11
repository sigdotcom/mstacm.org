import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

import { config } from "../config";

const uploadLink: ApolloLink = createUploadLink({
  uri: config.API_URI
});

const authLink: ApolloLink = setContext(async (_: any, { headers }: any) => {
  // Get access token from local storage
  const token: string = localStorage.getItem(config.ACCESS_TOKEN_KEY) || "";

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const client: ApolloClient<{}> = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink)
});
