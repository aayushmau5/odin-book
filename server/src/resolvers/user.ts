import { hash } from "bcryptjs";

import { checkForSelectionField } from "../utils/getSelections";
import {
  db_getUser,
  addUser,
  getUserByEmail,
  setProfile,
  updateCommonProfile,
  deleteProfile,
  deleteUser as removeUser,
  db_getAllUsers,
} from "../utils/db/user";
import { removeAllPostByUser } from "../utils/db/post";
import { removeAllCommentsByUser } from "../utils/db/comment";
import {
  LoginInput,
  ProfileInput,
  SignupInput,
} from "../types/UserProfileTypes";
import {
  validateLoginInput,
  validateProfileInput,
  validateSignupInput,
} from "../utils/validation/userInputValidation";

const selectionsForUser = [
  "profile",
  "posts",
  "comments",
  "friends",
  "friends_posts",
  "friendsrequest_to",
];

export const getAllUsers = async (
  _: any,
  _args: any,
  _context: any,
  info: any
) => {
  return await db_getAllUsers(checkForSelectionField(info, selectionsForUser));
};

export const getUser = async (
  _: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  return await db_getUser(id, checkForSelectionField(info, selectionsForUser));
};

export const createProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { userId }: { userId: string }
) => {
  const validatedData = validateProfileInput(data);
  return await setProfile(userId, validatedData);
};

export const updateProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = validateProfileInput(data);
  return await updateCommonProfile(currentProfileId, validatedData);
};

export const signup = async (_: any, args: { data: SignupInput }) => {
  const { username, email, password } = validateSignupInput(args.data);
  hash;
  const hashedPassword = await hash(password, 16);
  return await addUser(username, email, hashedPassword);
};

export const login = async (
  _: any,
  args: { data: LoginInput },
  __: any,
  info: any
) => {
  const { email, password } = validateLoginInput(args.data);
  return await getUserByEmail(
    email,
    checkForSelectionField(info, selectionsForUser)
  );
};

export const deleteCurrentUser = async (
  _: any,
  __: any,
  { userId, currentProfileId }: { userId: string; currentProfileId: string }
) => {
  await removeAllCommentsByUser(currentProfileId);
  await removeAllPostByUser(currentProfileId);
  await deleteProfile(currentProfileId);
  return await removeUser(userId);
};
