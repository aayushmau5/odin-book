import { Arg, Ctx, Mutation, Resolver, Authorized } from "type-graphql";

import { FriendRequests, Friends } from "../schema/user";
import { Context } from "../types/context";
import * as FriendsDb from "../utils/db/friends";
import { getProfileId } from "../utils/db/user";

@Resolver()
export class FriendsResolver {
  @Authorized()
  @Mutation((returns) => FriendRequests, { nullable: true })
  async sendFriendRequest(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const receiverProfileId = await getProfileId(userId);
    return await FriendsDb.sendFriendRequest(
      ctx.currentProfileId,
      receiverProfileId
    );
  }

  @Authorized()
  @Mutation((returns) => FriendRequests, { nullable: true })
  async cancelFriendRequest(
    @Arg("userId") userId: string,
    @Ctx() ctx: Context
  ) {
    const receiverProfileId = await getProfileId(userId);
    return await FriendsDb.deleteFriendRequest(
      ctx.currentProfileId,
      receiverProfileId
    );
  }

  @Authorized()
  @Mutation((returns) => Friends, { nullable: true })
  async acceptFriendRequest(
    @Arg("userId") userId: string,
    @Ctx() ctx: Context
  ) {
    const receiverProfileId = await getProfileId(userId);
    return await FriendsDb.acceptRequest(
      ctx.currentProfileId,
      receiverProfileId
    );
  }

  @Authorized()
  @Mutation((returns) => Friends, { nullable: true })
  async unfriendUser(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const receiverProfileId = await getProfileId(userId);
    return await FriendsDb.unfriend(ctx.currentProfileId, receiverProfileId);
  }
}
