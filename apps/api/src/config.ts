export interface IConfig {
  DO_SPACES_CDN_BUCKET_NAME: string;
  DO_SPACES_REGION: string;
  DO_SPACES_ENDPOINT: string;
  DO_SPACES_ACCESS_KEY_ID: string;
  DO_SPACES_SECRET_KEY_ID: string;
  AZURE_CDN_URI: string;
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

const { AUTH0_DOMAIN } = process.env;
const DO_SPACES_REGION = process.env.DO_SPACES_REGION || "nyc3";
export const config: IConfig = {
  DO_SPACES_CDN_BUCKET_NAME:
    process.env.DO_SPACES_CDN_BUCKET_NAME || "mstacm-cdn-test",
  DO_SPACES_REGION,
  DO_SPACES_ENDPOINT:
    process.env.DO_SPACES_ENDPOINT ||
    `${DO_SPACES_REGION}.digitaloceanspaces.com`,
  DO_SPACES_ACCESS_KEY_ID: process.env.DO_SPACES_ACCESS_KEY_ID || "changeme",
  DO_SPACES_SECRET_KEY_ID: process.env.DO_SPACES_SECRET_KEY_ID || "changeme",
  AZURE_CDN_URI: process.env.AZURE_CDN_URI || "https://cdn.mstacm.org",
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
