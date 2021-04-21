import { Kind, GraphQLScalarType } from "graphql";
import { users, profiles, user, profile } from "./user";

// Custome "DateTime" Scalar
const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "Date custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

export const resolvers = {
  DateTime: dateScalar,
  Query: {
    users,
    user,
    profiles,
    profile,
  },
};
