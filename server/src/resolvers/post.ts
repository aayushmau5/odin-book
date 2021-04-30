import { AuthenticationError } from "apollo-server-errors";

import * as PostDb from "../utils/db/post";
import * as CommentDb from "../utils/db/comment";
import { getProfileId } from "../utils/db/user";
import { checkForSelectionField } from "../utils/getSelections";
import * as Validations from "../utils/validation/postInputValidation";
import { PostInput, PostComment, CommentComment } from "../types/PostTypes";

const postSelections = ["author", "user"];

export const getAllPosts = async (_: any, __: any, ___: any, info: any) => {
  return await PostDb.db_getAllPosts(
    checkForSelectionField(info, postSelections)
  );
};

export const createPost = async (
  _: any,
  { data }: { data: PostInput },
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = Validations.validatePostInput(data);
  return await PostDb.savePost(currentProfileId, validatedData);
};

export const getAllPostsByUser = async (
  _: any,
  { userId }: { userId: string },
  __: any,
  info: any
) => {
  const profileId = await getProfileId(userId);
  return await PostDb.getPostByProfile(
    profileId,
    checkForSelectionField(info, postSelections)
  );
};

export const getFeed = async (
  _: any,
  __: any,
  { currentProfileId }: { currentProfileId: string }
) => {
  return await PostDb.generateFeedForUser(currentProfileId);
};

export const likePost = async (
  _: any,
  { postId }: { postId: string },
  { currentProfileId }: { currentProfileId: string }
) => {
  const data = await PostDb.increaseLike(currentProfileId, postId);
  return { liked_by: data.likes, likes: data._count?.likes };
};

export const dislikePost = async (
  _: any,
  { postId }: { postId: any },
  { currentProfileId }: { currentProfileId: string }
) => {
  const data = await PostDb.decreaseLike(currentProfileId, postId);
  return { liked_by: data.likes, likes: data._count?.likes };
};

export const createCommentOnPost = async (
  _: any,
  { postId, data }: PostComment,
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = Validations.validateCommentInput(data);
  return await CommentDb.addCommentToPost(
    currentProfileId,
    postId,
    validatedData
  );
};

export const createCommentOnComment = async (
  _: any,
  { postId, commentId, data }: CommentComment,
  { currentProfileId }: { currentProfileId: string }
) => {
  const validatedData = Validations.validateCommentInput(data);
  return await CommentDb.commentOnComment(
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
  const comment = await CommentDb.getSingleComment(commentId);
  if (comment?.author.userId !== currentUserId) {
    throw new AuthenticationError("Access Denied");
  }
  return await CommentDb.removeComment(commentId);
};

export const deletePost = async (
  _: any,
  { postId }: { postId: string },
  { currentUserId }: { currentUserId: string }
) => {
  const post = await PostDb.getSinglePost(postId);
  if (post?.author.userId !== currentUserId) {
    throw new AuthenticationError("Access Denied");
  }
  return await PostDb.removePost(postId);
};
