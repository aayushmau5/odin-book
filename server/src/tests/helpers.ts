import "reflect-metadata";
import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";

import { createSchema } from "../resolvers/createSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  token?: string;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({
  source,
  variableValues,
  token,
}: Options) => {
  if (!schema) schema = await createSchema(); // cache
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      token,
    },
  });
};
