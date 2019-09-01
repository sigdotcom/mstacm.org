interface IConfig {
  GRAPHQL_URL: string;
  TOKEN_STORAGE_KEY: string;
}

export const config: IConfig = {
  GRAPHQL_URL: process.env.GRAPHQL_URL || "http://localhost/graphql",
  TOKEN_STORAGE_KEY: process.env.TOKEN_STORAGE_KEY || "token"
};
