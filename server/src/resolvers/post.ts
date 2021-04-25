import { AuthenticationError } from "apollo-server-errors";
import { PostInput, PostComment, CommentComment } from "../types/PostTypes";
import {
  addCommentToPost,
  commentOnComment,
  getSingleComment,
  removeComment,
} from "../utils/db/comment";
import {
  db_getAllPosts,
  getPostByProfile,
  generateFeedForUser,
  increaseLike,
  decreaseLike,
  getSinglePost,
  removePost,
  savePost,
} from "../utils/db/post";
import { getProfileId } from "../utils/db/user";
import { checkForSelectionField } from "../utils/getSelections";
import {
  validateCommentInput,
  validatePostInput,
} from "../utils/validation/postInputValidation";

const postSelections = ["author", "user"];

export const getAllPosts = async (_: any, __: any, ___: any, info: any) => {
  return await db_getAllPosts(checkForSelectionField(info, postSelections));
};

export const createPost = async (
  _: any,
  { data }: { data: PostInput },
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = validatePostInput(data);
  return await savePost(currentProfileId, validatedData);
};

export const getAllPostsByUser = async (
  _: any,
  { userId }: { userId: string },
  __: any,
  info: any
) => {
  const profileId = await getProfileId(userId);
  return await getPostByProfile(
    profileId,
    checkForSelectionField(info, postSelections)
  );
};

export const getFeed = async (
  _: any,
  __: any,
  { currentProfileId }: { currentProfileId: string }
) => {
  return await generateFeedForUser(currentProfileId);
};

export const likePost = async (
  _: any,
  { postId }: { postId: string },
  { currentProfileId }: { currentProfileId: string }
) => {
  const data = await increaseLike(currentProfileId, postId);
  return { liked_by: data.likes, likes: data._count?.likes };
};

export const dislikePost = async (
  _: any,
  { postId }: { postId: any },
  { currentProfileId }: { currentProfileId: string }
) => {
  const data = await decreaseLike(currentProfileId, postId);
  return { liked_by: data.likes, likes: data._count?.likes };
};

export const createCommentOnPost = async (
  _: any,
  { postId, data }: PostComment,
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = validateCommentInput(data);
  return await addCommentToPost(currentProfileId, postId, validatedData);
};

export const createCommentOnComment = async (
  _: any,
  { postId, commentId, data }: CommentComment,
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = validateCommentInput(data);
  return await commentOnComment(
    postId,
    commentId,
    currentProfileId,
    validatedData
  );
};

export const deleteComment = async (
  _: any,
  { commentId }: { commentId: string },
  { currentUserId }: { currentUserId: string }
) => {
  const comment = await getSingleComment(commentId);
  if (comment?.author.userId !== currentUserId) {
    throw new AuthenticationError("Access Denied");
  }
  return await removeComment(commentId);
};

export const deletePost = async (
  _: any,
  { postId }: { postId: string },
  { currentUserId }: { currentUserId: string }
) => {
  const post = await getSinglePost(postId);
  if (post?.author.userId !== currentUserId) {
    throw new AuthenticationError("Access Denied");
  }
  return await removePost(postId);
};
