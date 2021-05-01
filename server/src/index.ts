import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { FriendsResolver } from "./resolvers/friends";
import { PostsResolver } from "./resolvers/post";

const main = async () => {
  const PORT = process.env.PORT || 8000;
  const app = express();
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [UserResolver, FriendsResolver, PostsResolver],
  });

  const apolloserver = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
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
