import { users, user, signup } from "./user";
import { posts, addPost } from "./post";
import { Kind, GraphQLScalarType } from "graphql";
import { getAllProfiles } from "../utils/db/user";

// custom "DateTime" scalar
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
    users: {
      id: "",
      email: "",
      username: "",
      profile: "",
      posts: "",
    },
  },
};
