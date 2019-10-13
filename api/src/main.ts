import { ApolloServer } from "apollo-server-koa";
import "reflect-metadata";

import * as TypeGraphQL from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";
import Koa from "koa";
import "./lib/errors";
import "./lib/products";

import { app } from "./app";
import { authChecker } from "./lib/auth";

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
      context: ({ ctx }: { ctx: Koa.ParameterizedContext }) => ctx,
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
