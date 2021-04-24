import { checkForSelectionField } from "../utils/getSelections";
import {
  db_getUser,
  addUser,
  getUserByEmail,
  setProfile,
  updateCommonProfile,
  getProfileId,
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
  return await setProfile(userId, data);
};

export const updateProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { currentProfileId }: { currentProfileId: string }
) => {
  return await updateCommonProfile(currentProfileId, data);
};

export const signup = async (_: any, args: { data: SignupInput }) => {
  const { username, email, password } = args.data;
  const hashedPassword = password;
  return await addUser(username, email, hashedPassword);
};

export const login = async (
  _: any,
  args: { data: LoginInput },
  __: any,
  info: any
) => {
  const { email, password } = args.data;
  const user = await getUserByEmail(
    email,
    checkForSelectionField(info, selectionsForUser)
  );
  return user;
};

export const deleteUser = async (
  _: any,
  __: any,
  { userId, currentProfileId }: { userId: string; currentProfileId: string }
) => {
  await removeAllCommentsByUser(currentProfileId);
  await removeAllPostByUser(currentProfileId);
  await deleteProfile(currentProfileId);
  return await removeUser(userId);
};
