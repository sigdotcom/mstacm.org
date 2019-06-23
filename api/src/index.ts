import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import * as TypeGraphQL from "type-graphql";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";

import { Context, seedDatabase } from "./helpers";
import { User } from "./user/user.entity";

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
      container: Container,
      resolvers: [
        `${__dirname}/**/*.resolver.ts`,
        `${__dirname}/**/*.resolver.js`
      ]
    });

    // create mocked context
    const context: Context = { user: defaultUser };

    // Create GraphQL server
    const server = new ApolloServer({ schema, context });

    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
