import { ApolloServer } from "apollo-server-koa";
import "reflect-metadata";
import * as TypeGraphQL from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";
import "./lib/errors";

import { app } from "./app";
import { authChecker } from "./lib/auth";

import { ParameterizedContext as KoaContext } from "koa";

// register 3rd party IOC container
useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    const connection = await createConnection();

    await connection.runMigrations();

    if (process.env.NODE_ENV !== "production") {
      await connection.synchronize();
    }

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
      schema
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
