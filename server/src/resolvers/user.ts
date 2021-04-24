import { checkForSelectionField } from "../utils/getSelections";
import {
  getAllUser,
  getUser,
  addUser,
  getUserByEmail,
  setProfile,
  updateCommonProfile,
  getProfileId,
  deleteProfile,
  deleteUser as removeUser,
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

export const users = async (_: any, _args: any, _context: any, info: any) => {
  return await getAllUser(checkForSelectionField(info, selectionsForUser));
};

export const user = async (
  _: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  return await getUser(id, checkForSelectionField(info, selectionsForUser));
};

export const addProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { userId }: { userId: string }
) => {
  return await setProfile(userId, data);
};

export const updateProfile = async (
  _: any,
  { data }: { data: ProfileInput },
  { userId }: { userId: string }
) => {
  let profileId = await getProfileId(userId);
  return await updateCommonProfile(profileId, data);
};

export const signup = async (_: any, args: { data: SignupInput }) => {
  const { username, email, password } = args.data;
  const hashedPassword = password;
  return await addUser(username, email, hashedPassword);
};

export const login = async (
  _: any,
  args: { data: LoginInput },
  _context: any,
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
  { userId }: { userId: string }
) => {
  const profileId = await getProfileId(userId);
  await removeAllCommentsByUser(profileId);
  await removeAllPostByUser(profileId);
  await deleteProfile(profileId);
  return await removeUser(userId);
};
