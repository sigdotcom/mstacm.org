export interface IConfig {
  AZURE_STORAGE_ACCOUNT: string;
  AZURE_STORAGE_ACCOUNT_KEY: string;
  JWT_ALGORITHM: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  JWT_JWKS_URI: string;
  JWT_USERINFO_URI: string;
  SECRET_APP_KEY: string;
  STRIPE_PRIVATE_TOKEN: string;
  STRIPE_PUBLIC_TOKEN: string;
  STRIPE_WEBHOOK_SECRET: string;
  NODE_ENV: string;
  ext: string;
  host: string;
  port: number;
}

const AUTH0_DOMAIN = "mstacm.auth0.com";
export const config: IConfig = {
  AZURE_STORAGE_ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT || "mstacm",
  AZURE_STORAGE_ACCOUNT_KEY: process.env.AZURE_STORAGE_ACCOUNT_KEY || "DEV_KEY",
  JWT_ALGORITHM: "RS256",
  JWT_AUDIENCE: "graphql.mstacm.org",
  JWT_ISSUER: `https://${AUTH0_DOMAIN}/`,
  JWT_JWKS_URI: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  JWT_USERINFO_URI: `https://${AUTH0_DOMAIN}/userinfo`,
  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET_APP_KEY: process.env.SECRET_APP_KEY || "DEV_KEY",
  STRIPE_PRIVATE_TOKEN: process.env.STRIPE_PRIVATE_TOKEN || "DEV_KEY",
  STRIPE_PUBLIC_TOKEN: process.env.STRIPE_PUBLIC_TOKEN || "DEV_KEY",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "DEV_KEY",
  ext: process.env.NODE_ENV !== "production" ? ".ts" : ".js",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT || "3000", 10)
};
