import { Kind, GraphQLScalarType, GraphQLNonNull } from "graphql";
import { getAllProfiles, getAllUser } from "../utils/db/user";
import { parseResolveInfo } from "graphql-parse-resolve-info";

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

function checkForSelectionField(
  info: any,
  field: string,
  selections: string[]
): object {
  const parsedInfo = parseResolveInfo(info);
  const nestedFields: any = {};
  if (!parsedInfo) return {};
  const fieldsObject: any = parsedInfo.fieldsByTypeName[field];
  selections;
  const rootKeys = Object.keys(fieldsObject);
  for (const key of rootKeys) {
    const selectedField = fieldsObject[key].fieldsByTypeName;
    if (Object.keys(selectedField).length !== 0) {
      nestedFields[key] = true;
    }
  }

  console.log(fieldsObject);
  return {};
  // return selections.reduce((acc, currentValue) => {
  //   const value = currentValue.name.value;
  //   if (fields.includes(value)) {
  //     acc[value] = true;
  //   }
  //   return acc;
  // }, {});
}

export const resolvers = {
  DateTime: dateScalar,
  Query: {
    users: async (_: any, __: any, ___: any, info: any) => {
      return await getAllUser(
        checkForSelectionField(info, "User", ["Profile"])
      );
    },
    profiles: async (_: any, __: any, ___: any, info: any) => {
      const parsedInfo = parseResolveInfo(info);
      return await getAllProfiles(
        checkForSelectionField(parsedInfo, "Profile", ["Posts"])
      );
    },
  },
};
