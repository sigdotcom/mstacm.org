import { ApolloServer } from "apollo-server-koa";
import "reflect-metadata";
import * as TypeGraphQL from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";
import { app } from "./app";

import { authChecker } from "./lib/auth";

import { ParameterizedContext as KoaContext } from "koa";
import { seedDatabase } from "./lib/helpers";
import { User } from "./resources/User";

// register 3rd party IOC container
useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await createConnection();

    // seed database with some data
    const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      authChecker,
      container: Container,
      resolvers: [`${__dirname}/**/resolver.ts`, `${__dirname}/**/resolver.js`]
    });

    // create mocked context
    // Create GraphQL server
    const server = new ApolloServer({
      context: ({ ctx }: { ctx: KoaContext }) => ctx,
      schema,
      tracing: true
    });

    server.applyMiddleware({ app });

    // Start the server
    await app.listen(4000);
    console.log(
      `Server is running, GraphQL Playground available at:

      http://localhost/graphql || http://localhost:4000/graphql`
    );
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
