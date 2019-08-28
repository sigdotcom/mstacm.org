const IS_PROD = process.env.NODE_ENV === "production";
const ROOT_DIR = IS_PROD ? "build/src" : "src";

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || "phoenix",
  password: process.env.DB_PASSWORD || "phoenix",
  database: process.env.DB_TABLE || "phoenix",
  port: process.env.DB_PORT || 5432,
  // Should we automatically synchronize our database?
  synchronize: IS_PROD ? false : true,
  logging: "all",
  // Run migrations automatically,
  migrationsRun: IS_PROD ? true : false,
  logger: "advanced-console",
  // Should we automatically drop the entire database on start?
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
