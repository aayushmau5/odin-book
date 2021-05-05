import {
  Arg,
  Authorized,
  Ctx,
  Info,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { AuthenticationError } from "apollo-server-express";

import {
  BaseComment,
  BasePost,
  Comment,
  LikeDislike,
  Post,
} from "../schema/post";
import { checkForSelectionField } from "../utils/getSelections";
import * as PostDb from "../utils/db/post";
import * as CommentDb from "../utils/db/comment";
import { getProfileId } from "../utils/db/user";
import { Context } from "../types/context";
import { PostInput } from "../schema/inputs";

const postSelections = ["author", "user"];

@Resolver()
export class PostsResolver {
  @Query((returns) => [Post], { nullable: "items" })
  async getAllPosts(@Info() info: any): Promise<Post[]> {
    return await PostDb.db_getAllPosts(
      checkForSelectionField(info, postSelections)
    );
  }

  @Query((returns) => [Post], { nullable: "items" })
  async getAllPostsByUser(
    @Arg("userId") userId: string,
    @Info() info: any
  ): Promise<Post[]> {
    const profileId = await getProfileId(userId);
    return await PostDb.getPostByProfile(
      profileId,
      checkForSelectionField(info, postSelections)
    );
  }

  @Authorized()
  @Query((returns) => [Post], { nullable: "items" })
  async getFeed(@Ctx() ctx: Context): Promise<Post[]> {
    return await PostDb.generateFeedForUser(ctx.currentProfileId);
  }

  @Authorized()
  @Mutation((returns) => [BasePost])
  async createPost(
    @Arg("data") { data, image }: PostInput,
    @Ctx() ctx: Context
  ): Promise<BasePost | null> {
    return await PostDb.savePost(ctx.currentProfileId, { data, image });
  }

  @Authorized()
  @Mutation((returns) => LikeDislike)
  async likePost(
    @Arg("postId") postId: string,
    @Ctx() ctx: Context
  ): Promise<LikeDislike | null> {
    const data = await PostDb.increaseLike(ctx.currentProfileId, postId);
    return { liked_by: data.likes, likes: data._count?.likes };
  }

  @Authorized()
  @Mutation((returns) => LikeDislike)
  async dislikePost(
    @Arg("postId") postId: string,
    @Ctx() ctx: Context
  ): Promise<LikeDislike | null> {
    const data = await PostDb.decreaseLike(ctx.currentProfileId, postId);
    return { liked_by: data.likes, likes: data._count?.likes };
  }

  @Authorized()
  @Mutation((returns) => Comment)
  async createCommentOnPost(
    @Arg("postId") postId: string,
    @Arg("data") data: string,
    @Ctx() ctx: Context
  ): Promise<BaseComment> {
    return await CommentDb.addCommentToPost(ctx.currentProfileId, postId, data);
  }

  @Authorized()
  @Mutation((returns) => Comment)
  async createCommentOnComment(
    @Arg("postId") postId: string,
    @Arg("commentId") commentId: string,
    @Arg("data") data: string,
    @Ctx() ctx: Context
  ): Promise<BaseComment> {
    return await CommentDb.commentOnComment(
      postId,
      commentId,
      ctx.currentProfileId,
      data
    );
  }

  @Authorized()
  @Mutation((returns) => Comment, { nullable: true })
  async deleteComment(
    @Arg("commentId") commentId: string,
    @Ctx() ctx: Context
  ): Promise<BaseComment> {
    const comment = await CommentDb.getSingleComment(commentId);
    if (comment?.author.userId !== ctx.currentUserId) {
      throw new AuthenticationError("Access Denied");
    }
    return await CommentDb.removeComment(commentId);
  }

  @Authorized()
  @Mutation((returns) => Post, { nullable: true })
  async deletePost(
    @Arg("postId") postId: string,
    @Ctx() ctx: Context
  ): Promise<BasePost> {
    const post = await PostDb.getSinglePost(postId);
    if (post?.author.userId !== ctx.currentUserId) {
      throw new AuthenticationError("Access Denied");
    }
    return await PostDb.removePost(postId);
  }
}
