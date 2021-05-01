import { Arg, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";

import { Comment, LikeDislike, Post, PostWithAuthor } from "../schema/post";
import { checkForSelectionField } from "../utils/getSelections";
import * as PostDb from "../utils/db/post";
import * as CommentDb from "../utils/db/comment";
import { getProfileId } from "../utils/db/user";
import { Context } from "node:vm";
import { PostInput } from "../schema/inputs";
import { AuthenticationError } from "apollo-server-express";

const postSelections = ["author", "user"];

@Resolver()
export class PostsResolver {
  @Query((returns) => [Post], { nullable: "items" })
  async getAllPosts(@Info() info: any) {
    return await PostDb.db_getAllPosts(
      checkForSelectionField(info, postSelections)
    );
  }

  @Query((returns) => [Post], { nullable: "items" })
  async getAllPostsByUser(@Arg("userId") userId: string, @Info() info: any) {
    const profileId = await getProfileId(userId);
    return await PostDb.getPostByProfile(
      profileId,
      checkForSelectionField(info, postSelections)
    );
  }

  @Query((returns) => [Post], { nullable: "items" })
  async getFeed(@Ctx() ctx: Context) {
    return await PostDb.generateFeedForUser(ctx.currentProfileId);
  }

  @Mutation((returns) => [PostWithAuthor])
  async createPost(
    @Arg("data") { data, image }: PostInput,
    @Ctx() ctx: Context
  ) {
    return await PostDb.savePost(ctx.currentProfileId, { data, image });
  }

  @Mutation((returns) => LikeDislike)
  async likePost(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const data = await PostDb.increaseLike(ctx.currentProfileId, postId);
    return { liked_by: data.likes, likes: data._count?.likes };
  }

  @Mutation((returns) => LikeDislike)
  async dislikePost(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const data = await PostDb.decreaseLike(ctx.currentProfileId, postId);
    return { liked_by: data.likes, likes: data._count?.likes };
  }

  @Mutation((returns) => Comment)
  async createCommentOnPost(
    @Arg("postId") postId: string,
    @Arg("data") data: string,
    @Ctx() ctx: Context
  ) {
    return await CommentDb.addCommentToPost(ctx.currentProfileId, postId, data);
  }

  @Mutation((returns) => Comment)
  async createCommentOnComment(
    @Arg("postId") postId: string,
    @Arg("commentId") commentId: string,
    @Arg("data") data: string,
    @Ctx() ctx: Context
  ) {
    return await CommentDb.commentOnComment(
      postId,
      commentId,
      ctx.currentProfileId,
      data
    );
  }

  @Mutation((returns) => Comment, { nullable: true })
  async deleteComment(
    @Arg("commentId") commentId: string,
    @Ctx() ctx: Context
  ) {
    const comment = await CommentDb.getSingleComment(commentId);
    if (comment?.author.userId !== ctx.currentUserId) {
      throw new AuthenticationError("Access Denied");
    }
    return await CommentDb.removeComment(commentId);
  }

  @Mutation((returns) => Post, { nullable: true })
  async deletePost(@Arg("postId") postId: string, @Ctx() ctx: Context) {
    const post = await PostDb.getSinglePost(postId);
    if (post?.author.userId !== ctx.currentUserId) {
      throw new AuthenticationError("Access Denied");
    }
    return await PostDb.removePost(postId);
  }
}
