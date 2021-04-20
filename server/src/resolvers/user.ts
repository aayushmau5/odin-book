import { ValidationError } from "apollo-server-express";

import { checkForSelectionField } from "../utils/getSelections";
import { getAllUser, getUser, getAllProfiles } from "../utils/db/user";
import { saveUser } from "../controllers/user";

export const users = async (_: any, __: any, ___: any, info: any) => {
  return await getAllUser(
    checkForSelectionField(info, ["profile", "posts", "comments"])
  );
};

export const user = async (
  _: any,
  { id }: { id: string },
  __: any,
  info: any
) => {
  try {
    return await getUser(
      id,
      checkForSelectionField(info, ["profile", "posts", "comments"])
    );
  } catch (err) {
    console.log(err);
    return new ValidationError("Invalid Id");
  }
};

export const profiles = async (_: any, __: any, ___: any, info: any) => {
  return await getAllProfiles(
    checkForSelectionField(info, ["user", "posts", "comments"])
  );
};

export const signup = async (
  _: any,
  args: { user: { username: string; email: string; password: string } }
) => {
  return await saveUser(args.user);
};
