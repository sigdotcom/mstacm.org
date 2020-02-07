export interface IConfig {
  DO_SPACES_CDN_BUCKET_NAME: string;
  DO_SPACES_REGION: string;
  DO_SPACES_ENDPOINT: string;
  DO_SPACES_ACCESS_KEY_ID: string;
  DO_SPACES_SECRET_KEY_ID: string;
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

const DO_SPACES_REGION = process.env.DO_SPACES_REGION || "nyc3";

const {
  AUTH0_DOMAIN, // The domain used for authentication. Can be found at https://manage.auth0.com/dashboard/us/mstacm/tenant/custom_domains
  DO_SPACES_CDN_BUCKET_NAME, // The bucket name used to store all CDN files on DigitalOcean.
  DO_SPACES_ENDPOINT, // The endpoint used to serve the digitalocean spaces.
  DO_SPACES_ACCESS_KEY_ID, // The access key for the digitalocean spaces.
  DO_SPACES_SECRET_KEY_ID, // The secret key for the digitalocean spaces.
  JWT_ALGORITHM,
  JWT_AUDIENCE,
  JWT_ISSUER,
  JWT_JWKS_URI,
  JWT_USERINFO_URI,
  SECRET_APP_KEY, // Secret key used in KoaJS
  STRIPE_PRIVATE_TOKEN, // The private token used to access Stripe.
  STRIPE_PUBLIC_TOKEN, // The public token used to access Stripe.
  STRIPE_WEBHOOK_SECRET // The signing secret used for the Stripe webhook. Can be found at https://dashboard.stripe.com/webhooks.
} = process.env;

const PRODUCTION_DEFINED_VARS: [string, string | undefined][] = [
  ["AUTH0_DOMAIN", AUTH0_DOMAIN],
  ["DO_SPACES_CDN_BUCKET_NAME", DO_SPACES_CDN_BUCKET_NAME],
  ["DO_SPACES_ENDPOINT", DO_SPACES_ENDPOINT],
  ["DO_SPACES_ACCESS_KEY_ID", DO_SPACES_ACCESS_KEY_ID],
  ["DO_SPACES_SECRET_KEY_ID", DO_SPACES_SECRET_KEY_ID],
  ["SECRET_APP_KEY", SECRET_APP_KEY],
  ["STRIPE_PRIVATE_TOKEN", STRIPE_PRIVATE_TOKEN],
  ["STRIPE_PUBLIC_TOKEN", STRIPE_PUBLIC_TOKEN],
  ["STRIPE_WEBHOOK_SECRET", STRIPE_WEBHOOK_SECRET]
];

if (process.env.NODE_ENV === "production") {
  const undefinedVariables = PRODUCTION_DEFINED_VARS.filter(item => {
    return item[1] === undefined;
  });

  if (undefinedVariables.length > 0) {
    const missingVariables = undefinedVariables.map(item => item[0]).join(", ");
    const test = `The following variables are undefined in production ${missingVariables}`;
    throw new Error(test);
  }
}

export const config: IConfig = {
  DO_SPACES_CDN_BUCKET_NAME: DO_SPACES_CDN_BUCKET_NAME || "mstacm-cdn-test",
  DO_SPACES_REGION,
  DO_SPACES_ENDPOINT:
    DO_SPACES_ENDPOINT || `${DO_SPACES_REGION}.digitaloceanspaces.com`,
  DO_SPACES_ACCESS_KEY_ID: DO_SPACES_ACCESS_KEY_ID || "changeme",
  DO_SPACES_SECRET_KEY_ID: DO_SPACES_SECRET_KEY_ID || "changeme",
  JWT_ALGORITHM: JWT_ALGORITHM || "RS256",
  JWT_AUDIENCE: JWT_AUDIENCE || "graphql.mstacm.org",
  JWT_ISSUER: JWT_ISSUER || `https://${AUTH0_DOMAIN}/`,
  JWT_JWKS_URI: JWT_JWKS_URI || `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  JWT_USERINFO_URI: JWT_USERINFO_URI || `https://${AUTH0_DOMAIN}/userinfo`,
  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET_APP_KEY: SECRET_APP_KEY || "DEV_KEY",
  STRIPE_PRIVATE_TOKEN: STRIPE_PRIVATE_TOKEN || "DEV_KEY",
  STRIPE_PUBLIC_TOKEN: STRIPE_PUBLIC_TOKEN || "DEV_KEY",
  STRIPE_WEBHOOK_SECRET: STRIPE_WEBHOOK_SECRET || "DEV_KEY",
  ext: process.env.NODE_ENV !== "production" ? ".ts" : ".js",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT || "3000", 10)
};
