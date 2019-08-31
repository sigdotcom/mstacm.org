export interface IConfig {
  ACCESS_TOKEN_KEY: string;
  API_URI: string;
  AUTH0_AUDIENCE: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_DOMAIN: string;
}

const IS_PROD: boolean = process.env.NODE_ENV === "production";

export const config: IConfig = {
  ACCESS_TOKEN_KEY: "auth0_access_token",
  API_URI: IS_PROD
    ? "https://api.mstacm.org/graphql"
    : "http://localhost/graphql",
  AUTH0_AUDIENCE: process.env.REACT_APP_AUTH0_AUDIENCE || "graphql.mstacm.org",
  AUTH0_CLIENT_ID:
    process.env.REACT_APP_AUTH0_CLIENT_ID || "U5F87knjS1tfcO7iDqQgd8Q3EeH6BnZt",
  AUTH0_DOMAIN: process.env.REACT_APP_AUTH0_DOMAIN || "mstacm.auth0.com"
};
