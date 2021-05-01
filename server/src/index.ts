import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./type-gql/resolvers/user";
import { prisma } from "./utils/db/db";
import {
  UserCrudResolver,
  UserRelationsResolver,
  ProfileCrudResolver,
  ProfileRelationsResolver,
  PostCrudResolver,
  PostRelationsResolver,
} from "./generated/typegraphql-prisma";

const main = async () => {
  const PORT = process.env.PORT || 8000;
  const app = express();
  dotenv.config();
  const schema = await buildSchema({
    resolvers: [
      UserCrudResolver,
      UserRelationsResolver,
      ProfileRelationsResolver,
      ProfileCrudResolver,
      PostCrudResolver,
      PostRelationsResolver,
    ],
    validate: false,
  });
  const apolloserver = new ApolloServer({
    schema,
    context: () => ({ prisma }),
  });

  app.use(cors({ credentials: true }));
  app.use(express.json());

  apolloserver.applyMiddleware({ app, cors: false });

  app.use((_, res) => {
    res.status(200);
    res.json({
      message: "Go to /graphql endpoint for GraphQL Server",
    });
  });

  app.listen(PORT, () => {
    if (process.env.NODE_ENV === "development") {
      console.log(`Listening on PORT http://localhost:${PORT}`);
    }
  });
};

main().catch((err) => console.log(err));
