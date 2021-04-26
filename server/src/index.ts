import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers/resolvers";

const main = async () => {
  const PORT = process.env.PORT || 8000;
  const app = express();
  dotenv.config();
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
    debug: false,
    context: ({ req, res }) => {
      // let token = "";
      // if (req && req.headers["authorization"]) {
      //   const authHeader = req.headers["authorization"];
      //   [, token] = authHeader.split(" ");
      // }
      let currentUserId;
      if (req && req.headers["user"]) {
        currentUserId = req.headers["user"];
      }
      return {
        req,
        res,
        currentUserId,
        // token,
      };
    },
  });

  app.use(cors({ credentials: true }));
  app.use(express.json());

  apolloserver.applyMiddleware({ app, cors: false });

  app.post("/oauth", (req, res) => {
    const body = req.body;
    res.json({
      body,
    });
  });

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
