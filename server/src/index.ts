import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from graphql",
  },
};

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
