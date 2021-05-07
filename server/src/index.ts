import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from "graphql-query-complexity";
// import helmet from "helmet";

import { isProd } from "./utils/constants";
import { createSchema } from "./resolvers/createSchema";

const main = async () => {
  const PORT = process.env.PORT || 8000;
  const app = express();
  dotenv.config();

  const schema = await createSchema();

  const apolloserver = new ApolloServer({
    schema,
    debug: false,
    context: ({ req, res }) => {
      let token;
      if (req && req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        [, token] = authHeader.split(" ");
      }

      return {
        token,
        req,
        res,
      };
    },
    plugins: [
      {
        // Checker for Query Complexity
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,

              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });
            if (complexity > 20) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`
              );
            }
          },
        }),
      },
    ],
  });

  // app.use(helmet()); // not letting the graphql playground load for some reason
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
    if (!isProd) {
      console.log(`Listening on PORT http://localhost:${PORT}`);
    }
  });
};

main().catch((err) => console.log(err));
