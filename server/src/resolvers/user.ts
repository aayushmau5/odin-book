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
import { generateJwt } from "../utils/jwt";

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
  { currentUserId }: { currentUserId: string }
) => {
  const validatedData = validateProfileInput(data);
  return await setProfile(currentUserId, validatedData);
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
  //Verify password
  const user = await getUserByEmail(
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
    const user = await getUserByEmail(
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
  const { email, password } = validateUserDataInput(args.data);
  const user = await addUser(email, password);
  const token = await generateJwt(user.id);
  return { user, token };
};

export const oauthSignup = async (_: any, args: { data: OAuthUserInput }) => {
  const { idToken } = validateOAuthUserDataInput(args.data);
  const payload = await verifyGoogleId(idToken);
  if (payload && payload.email) {
    let email = payload.email;
    const user = await addOAuthUser(email, idToken);
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
  await deleteProfile(currentProfileId);
  return await removeUser(currentUserId);
};
