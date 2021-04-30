import { compare, hash } from "bcryptjs";

import { checkForSelectionField } from "../utils/getSelections";
import * as UserDb from "../utils/db/user";
import { removeAllPostByUser } from "../utils/db/post";
import { removeAllCommentsByUser } from "../utils/db/comment";
import * as Validations from "../utils/validation/userInputValidation";
import { verifyGoogleId } from "../utils/google-id-verification";
import { AuthenticationError } from "apollo-server-errors";
import { generateJwt } from "../utils/jwt";
import {
  UserInput,
  ProfileInput,
  OAuthUserInput,
} from "../types/UserProfileTypes";

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
  return await UserDb.db_getAllUsers(
    checkForSelectionField(info, selectionsForUser)
  );
};

export const getUser = async (
  _: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  return await UserDb.db_getUser(
    id,
    checkForSelectionField(info, selectionsForUser)
  );
};

export const createProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { currentUserId }: { currentUserId: string }
) => {
  const validatedData = Validations.validateProfileInput(data);
  return await UserDb.setProfile(currentUserId, validatedData);
};

export const updateProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = Validations.validateProfileInput(data);
  return await UserDb.updateCommonProfile(currentProfileId, validatedData);
};

export const login = async (
  _: any,
  args: { data: UserInput },
  __: any,
  info: any
) => {
  const { email, password } = Validations.validateUserDataInput(args.data);
  const user = await UserDb.getUserByEmail(
    email,
    checkForSelectionField(info, selectionsForUser)
  );
  if (!user) {
    throw new AuthenticationError("User does not exist");
  }
  if (!user.password) {
    throw new AuthenticationError("UNAUTHENTICATED");
  }
  const result = await compare(password, user.password);
  if (!result) {
    throw new AuthenticationError("UNAUTHENTICATED");
  }
  const token = await generateJwt(user.id);
  return {
    user,
    token,
  };
};

export const oauthLogin = async (
  _: any,
  args: { data: OAuthUserInput },
  __: any,
  info: any
) => {
  const { idToken } = Validations.validateOAuthUserDataInput(args.data);
  const payload = await verifyGoogleId(idToken);
  if (payload && payload.email) {
    let email = payload.email;
    const user = await UserDb.getUserByEmail(
      email,
      checkForSelectionField(info, selectionsForUser)
    );
    if (!user) {
      throw new Error("User doesn't exist");
    }
    const token = await generateJwt(user.id);
    return {
      user,
      token,
    };
  } else {
    throw new AuthenticationError("Unauthenticated");
  }
};

export const signup = async (_: any, args: { data: UserInput }) => {
  const { email, password } = Validations.validateUserDataInput(args.data);
  const hashedPassword = await hash(password, 16);
  const user = await UserDb.addUser(email, hashedPassword);
  const token = await generateJwt(user.id);
  return { user, token };
};

export const oauthSignup = async (_: any, args: { data: OAuthUserInput }) => {
  const { idToken } = Validations.validateOAuthUserDataInput(args.data);
  const payload = await verifyGoogleId(idToken);
  if (payload && payload.email) {
    let email = payload.email;
    const user = await UserDb.addOAuthUser(email, idToken);
    const token = await generateJwt(user.id);
    return { user, token };
  } else {
    throw new AuthenticationError("Unauthenticated");
  }
};

export const deleteCurrentUser = async (
  _: any,
  __: any,
  {
    currentUserId,
    currentProfileId,
  }: { currentUserId: string; currentProfileId: string }
) => {
  await removeAllCommentsByUser(currentProfileId);
  await removeAllPostByUser(currentProfileId);
  await UserDb.deleteProfile(currentProfileId);
  return await UserDb.deleteUser(currentUserId);
};
