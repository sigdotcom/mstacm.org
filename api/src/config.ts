export interface IConfig {
  AZURE_STORAGE_ACCOUNT: string;
  AZURE_STORAGE_ACCOUNT_KEY: string;
  AZURE_STORAGE_URL: string;
  GOOGLE_CERTS_DOMAIN: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_ISSUER: string;
  GOOGLE_JWT_ALGORITHM: string;
  GOOGLE_PROFILE_DOMAIN: string;
  GOOGLE_PROVIDER_NAME: string;
  HOSTED_DOMAIN: string;
  SECRET_APP_KEY: string;
  STRIPE_PRIVATE_TOKEN: string;
  STRIPE_PUBLIC_TOKEN: string;
  NODE_ENV: string;
  ext: string;
  host: string;
  port: number;
}

export const config: IConfig = {
  AZURE_STORAGE_ACCOUNT: process.env.AZURE_STORAGE_ACCOUNT || "mstacm",
  AZURE_STORAGE_ACCOUNT_KEY: process.env.AZURE_STORAGE_ACCOUNT_KEY || "",
  AZURE_STORAGE_URL: "mstacm.azureedge.net",
  GOOGLE_CERTS_DOMAIN: "https://www.googleapis.com/oauth2/v1/certs",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "TEST_CLIENT_ID",
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || "TEST_CLIENT_SECRET",
  GOOGLE_ISSUER: "accounts.google.com",
  GOOGLE_JWT_ALGORITHM: "RS256",
  GOOGLE_PROFILE_DOMAIN: "https://www.googleapis.com/oauth2/v3/userinfo",
  GOOGLE_PROVIDER_NAME: "google",
  HOSTED_DOMAIN: "umsystem.edu",
  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET_APP_KEY: "change me",
  STRIPE_PRIVATE_TOKEN: process.env.STRIPE_PRIVATE_TOKEN || "TEST",
  STRIPE_PUBLIC_TOKEN: process.env.STRIPE_PUBLIC_TOKEN || "TEST",
  ext: process.env.NODE_ENV !== "production" ? ".ts" : ".js",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT || "3000", 10)
};
