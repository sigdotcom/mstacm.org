"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_1 = require("apollo-server");
require("reflect-metadata");
const TypeGraphQL = require("type-graphql");
const typedi_1 = require("typedi");
const TypeORM = require("typeorm");
const rate_1 = require("./entities/rate");
const recipe_1 = require("./entities/recipe");
const user_1 = require("./entities/user");
const helpers_1 = require("./helpers");
const recipe_resolver_1 = require("./resolvers/recipe-resolver");
TypeORM.useContainer(typedi_1.Container);
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield TypeORM.createConnection({
                type: "mysql",
                database: "type-graphql",
                username: "root",
                password: "qwerty123",
                port: 3306,
                host: "localhost",
                entities: [recipe_1.Recipe, rate_1.Rate, user_1.User],
                synchronize: true,
                logger: "advanced-console",
                logging: "all",
                dropSchema: true,
                cache: true
            });
            const { defaultUser } = yield helpers_1.seedDatabase();
            const schema = yield TypeGraphQL.buildSchema({
                resolvers: [recipe_resolver_1.RecipeResolver],
                container: typedi_1.Container
            });
            const context = { user: defaultUser };
            const server = new apollo_server_1.ApolloServer({ schema, context });
            const { url } = yield server.listen(4000);
            console.log(`Server is running, GraphQL Playground available at ${url}`);
        }
        catch (err) {
            console.error(err);
        }
    });
}
bootstrap();
//# sourceMappingURL=index.js.map