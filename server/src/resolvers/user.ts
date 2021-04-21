import { ValidationError } from "apollo-server-express";

import { checkForSelectionField } from "../utils/getSelections";
import {
  getAllUser,
  getUser,
  getAllProfiles,
  getProfile,
} from "../utils/db/user";
import { saveUser, loginUser } from "../controllers/user";

const selectionsForUser = [
  "profile",
  "posts",
  "comments",
  "friends",
  "friends_posts",
  "friendsrequest_to",
];

const selectionsForProfile = [
  "user",
  "posts",
  "comments",
  "friends",
  "friends_posts",
  "friendsrequest_to",
];

export const users = async (
  _parent: any,
  _args: any,
  _context: any,
  info: any
) => {
  return await getAllUser(checkForSelectionField(info, selectionsForUser));
};

export const user = async (
  _parent: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  try {
    return await getUser(id, checkForSelectionField(info, selectionsForUser));
  } catch (err) {
    console.log(err);
    return new ValidationError("Invalid Id");
  }
};

export const profiles = async (
  _parent: any,
  _args: any,
  _context: any,
  info: any
) => {
  return await getAllProfiles(
    checkForSelectionField(info, selectionsForProfile)
  );
};

export const profile = async (
  _parent: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  try {
    return await getProfile(
      id,
      checkForSelectionField(info, selectionsForProfile)
    );
  } catch (err) {
    console.log(err);
    return new ValidationError("Invalid Id");
  }
};

export const signup = async (
  _parent: any,
  args: { data: { username: string; email: string; password: string } }
) => {
  // TODO Validate user input
  return await saveUser(args.data);
};

export const login = async (
  _parent: any,
  args: { data: { email: string; password: string } },
  _context: any,
  info: any
) => {
  // TODO Validate user input
  return await loginUser(
    args.data,
    checkForSelectionField(info, selectionsForUser)
  );
};
