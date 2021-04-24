import { AuthenticationError } from "apollo-server-errors";
import {
  addCommentToPost,
  commentOnComment,
  getSingleComment,
  removeComment,
} from "../utils/db/comment";
import { getSinglePost, removePost, savePost } from "../utils/db/post";
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

export const addPost = async (
  _: any,
  args: { data: { text: string; image: string } },
  { userId }: { userId: string }
) => {
  const data = args.data;
  const profileId = await getProfileId(userId);
  return await savePost(profileId, data);
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

export const feed = async (
  _: any,
  _args: any,
  { userId }: { userId: string }
) => {
  const profileId = await getProfileId(userId);
  return await generateFeedForUser(profileId);
};

export const likePost = async (
  _: any,
  { postId }: { postId: any },
  { userId }: { userId: string }
) => {
  const profileId = await getProfileId(userId);
  const data = await increaseLike(profileId, postId);
  return { liked_by: data.likes, likes: data._count?.likes };
};

export const dislikePost = async (
  _: any,
  { postId }: { postId: any },
  { userId }: { userId: string }
) => {
  const profileId = await getProfileId(userId);
  const data = await decreaseLike(profileId, postId);
  return { liked_by: data.likes, likes: data._count?.likes };
};

export const addCommentOnPost = async (
  _: any,
  { postId, data }: { postId: string; data: string },
  { userId }: { userId: string }
) => {
  const profileId = await getProfileId(userId);
  return await addCommentToPost(profileId, postId, data);
};

export const addCommentOnComment = async (
  _: any,
  {
    postId,
    commentId,
    data,
  }: { postId: string; commentId: string; data: string },
  { userId }: { userId: string }
) => {
  const profileId = await getProfileId(userId);
  return await commentOnComment(postId, commentId, profileId, data);
};

export const deleteComment = async (
  _: any,
  { commentId }: { commentId: string },
  { userId }: { userId: string }
) => {
  const comment = await getSingleComment(commentId);
  if (comment?.author.userId !== userId) {
    throw new AuthenticationError("Access Denied");
  }
  return await removeComment(commentId);
};

export const deletePost = async (
  _: any,
  { postId }: { postId: string },
  { userId }: { userId: string }
) => {
  const post = await getSinglePost(postId);
  if (post?.author.userId !== userId) {
    throw new AuthenticationError("Access Denied");
  }
  return await removePost(postId);
};
