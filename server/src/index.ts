import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./query";
import { resolvers } from "./resolvers";

const main = async () => {
  const PORT = process.env.PORT || 8000;
  const app = express();
  dotenv.config();
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(cors({ credentials: true }));
  app.use(express.json());

  apolloserver.applyMiddleware({ app, cors: false });

  app.use((_, res) => {
    res.status(200);
    res.json({
      message: "Hello, World!",
    });
  });

  app.listen(PORT, () =>
    console.log(
      `Listening on PORT http://localhost:${PORT}${apolloserver.graphqlPath}`
    )
  );
};

main().catch((err) => console.log(err));
