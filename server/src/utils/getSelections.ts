import { flatten } from "flat";
import { parseResolveInfo } from "graphql-parse-resolve-info";

export function checkForSelectionField(info: any, fields: string[]): object {
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
