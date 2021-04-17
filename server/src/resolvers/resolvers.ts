import { users, user, signup } from "./user";
import { posts, addPost } from "./post";
import { Kind, GraphQLScalarType } from "graphql";
import { getAllProfiles, getAllUsersWithProfile } from "../utils/db/user";

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

function checkForSelectionField(ctx: any, field: string): boolean {
  const selections = ctx.fieldNodes[0].selectionSet.selections;
  const result = selections.filter((data: any) => data.name.value === field);
  return result.length !== 0 ? true : false;
}

export const resolvers = {
  DateTime: dateScalar,
  Query: {
    users: async (_: any, __: any, ___: any, ctx: any) => {
      if (checkForSelectionField(ctx, "profile")) {
        return await getAllUsersWithProfile();
      }
      return await users();
    },
    profiles: async () => {
      return await getAllProfiles();
    },
  },
};
