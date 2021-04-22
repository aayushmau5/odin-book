import { ValidationError } from "apollo-server-express";

import { checkForSelectionField } from "../utils/getSelections";
import {
  getAllUser,
  getUser,
  getAllProfiles,
  getProfile,
  addUser,
  getUserByEmail,
} from "../utils/db/user";

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
  //TODO hash the password before saving
  const { username, email, password } = args.data;
  const hashedPassword = password;
  return await addUser(username, email, hashedPassword);
};

export const login = async (
  _parent: any,
  args: { data: { email: string; password: string } },
  _context: any,
  info: any
) => {
  // TODO Validate user input
  //TODO JWT and stuff
  const { email, password } = args.data;
  const user = await getUserByEmail(
    email,
    checkForSelectionField(info, selectionsForUser)
  );
  if (!user) {
    const error = new ValidationError("User doesn't exist");
    error.status = 404;
    throw error;
  }
  return user;
};
