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
  addOAuthUser,
} from "../utils/db/user";
import { removeAllPostByUser } from "../utils/db/post";
import { removeAllCommentsByUser } from "../utils/db/comment";
import {
  UserInput,
  ProfileInput,
  OAuthUserInput,
} from "../types/UserProfileTypes";
import {
  validateProfileInput,
  validateUserDataInput,
  validateOAuthUserDataInput,
} from "../utils/validation/userInputValidation";
import { verifyGoogleId } from "../utils/google-id-verification";
import { AuthenticationError } from "apollo-server-errors";

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

export const login = async (
  _: any,
  args: { data: UserInput },
  __: any,
  info: any
) => {
  const { email, password } = validateUserDataInput(args.data);
  //TODO JWT and Stuff + Verify password
  return await getUserByEmail(
    email,
    checkForSelectionField(info, selectionsForUser)
  );
};

export const oauthLogin = async (
  _: any,
  args: { data: OAuthUserInput },
  __: any,
  info: any
) => {
  const { idToken } = validateOAuthUserDataInput(args.data);
  const payload = await verifyGoogleId(idToken);
  if (payload && payload.email) {
    let email = payload.email;
    return await getUserByEmail(
      email,
      checkForSelectionField(info, selectionsForUser)
    );
  } else {
    throw new AuthenticationError("Unauthenticated");
  }
};

export const signup = async (_: any, args: { data: UserInput }) => {
  const { email, password } = validateUserDataInput(args.data);
  hash;
  const hashedPassword = await hash(password, 16);
  return await addUser(email, hashedPassword);
};

export const oauthSignup = async (_: any, args: { data: OAuthUserInput }) => {
  const { idToken } = validateOAuthUserDataInput(args.data);
  const payload = await verifyGoogleId(idToken);
  if (payload && payload.email) {
    let email = payload.email;
    return await addOAuthUser(email, idToken);
  } else {
    throw new AuthenticationError("Unauthenticated");
  }
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
