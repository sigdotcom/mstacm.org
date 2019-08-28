const IS_PROD = process.env.NODE_ENV === "production";
const ROOT_DIR = IS_PROD ? "build" : "src";

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || "phoenix",
  password: process.env.DB_PASSWORD || "phoenix",
  database: process.env.DB_TABLE || "phoenix",
  port: process.env.DB_PORT || 5432,
  synchronize: IS_PROD ? false : true,
  logging: "all",
  logger: "advanced-console",
  dropSchema: IS_PROD ? false : true,
  cache: true,
  entities: [`${ROOT_DIR}/resources/**/index{.js,.ts}`],
  migrations: [`${ROOT_DIR}/migrations/**/*{.js,.ts}`],
  subscribers: [`${ROOT_DIR}/subscribers/**/*{.js.ts}`],
  cli: {
    entitiesDir: `${ROOT_DIR}/entities`,
    migrationsDir: `${ROOT_DIR}/migrations`,
    subscribersDir: `${ROOT_DIR}/subscribers`
  }
};
