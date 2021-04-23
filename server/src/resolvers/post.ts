import { savePost } from "../utils/db/post";
import {
  getAllPosts,
  getPostByProfile,
  generateFeedForUser,
  increaseLike,
  decreaseLike,
} from "../utils/db/post";
import { getProfileId } from "../utils/db/user";
import { checkForSelectionField } from "../utils/getSelections";

const postSelections = ["author", "user"];

export const posts = async (_: any, _args: any, _context: any, info: any) => {
  return await getAllPosts(checkForSelectionField(info, postSelections));
};

export const addPost = async (_: any, args: { data: { data: any } }) => {
  // GET ID from Auth
  const userId = "";
  const data = args.data.data;
  // TODO validate the data
  return await savePost(userId, data);
};

export const postsByUser = async (
  _: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  const profileId = await getProfileId(id);
  return await getPostByProfile(
    profileId,
    checkForSelectionField(info, postSelections)
  );
};

export const feed = async () => {
  // GET ID from Auth
  const id = "";
  const profileId = await getProfileId(id);
  return await generateFeedForUser(profileId);
};

export const likePost = async (_: any, { postId }: { postId: any }) => {
  return await increaseLike(postId);
};

export const dislikePost = async (_: any, { postId }: { postId: any }) => {
  return await decreaseLike(postId);
};

export const addCommentOnPost = () => {};
export const addCommentOnComment = () => {};
