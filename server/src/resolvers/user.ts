import { ValidationError } from "apollo-server-express";

import { checkForSelectionField } from "../utils/getSelections";
import {
  getAllUser,
  getUser,
  addUser,
  getUserByEmail,
  setProfile,
  updateCommonProfile,
  getProfileId,
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

export const addProfile = async (
  _: any,
  { data }: { data: { firstname: string; lastname: string; display: string } }
) => {
  let userId = "";
  return await setProfile(userId, data);
};

export const updateProfile = async (
  _: any,
  { data }: { data: { firstname: string; lastname: string; display: string } }
) => {
  let userId = "";
  let profileId = await getProfileId(userId);
  return await updateCommonProfile(profileId, data);
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
