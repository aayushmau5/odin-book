import { Kind, GraphQLScalarType, GraphQLNonNull } from "graphql";
import { getAllProfiles, getAllUser } from "../utils/db/user";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import { flatten } from "flat";

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

function checkForSelectionField(info: any, fields: string[]): object {
  const selections: any = {};
  const parsedInfo = parseResolveInfo(info);
  if (!parsedInfo) return {};
  flatten(parsedInfo, {
    transformKey(key) {
      if (fields.includes(key)) {
        selections[key] = true;
      }
      return key;
    },
  });
  return selections;
}

export const resolvers = {
  DateTime: dateScalar,
  Query: {
    users: async (_: any, __: any, ___: any, info: any) => {
      return await getAllUser(
        checkForSelectionField(info, ["profile", "posts", "comments"])
      );
    },
    profiles: async (_: any, __: any, ___: any, info: any) => {
      const parsedInfo = parseResolveInfo(info);
      return await getAllProfiles(
        checkForSelectionField(parsedInfo, ["user", "posts", "comments"])
      );
    },
  },
};
