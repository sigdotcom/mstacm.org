const ROOT_DIR = process.env.NODE_ENV != "production" ? "src/" : "build/";
const EXT = process.env.NODE_ENV != "production" ? ".ts" : ".js";

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_TABLE || "phoenix",
  port: process.env.DB_PORT || 5432,
  synchronize: true,
  logging: "all",
  logger: "advanced-console",
  dropSchema: true,
  cache: true,
  entities: [ROOT_DIR + "/**/entity" + EXT],
  migrations: [ROOT_DIR + "migrations/**/*" + EXT],
  subscribers: [ROOT_DIR + "subscribers/**/*" + EXT],
  cli: {
    entitiesDir: ROOT_DIR + "entities",
    migrationsDir: ROOT_DIR + "migrations",
    subscribersDir: ROOT_DIR + "subscribers"
  }
};
