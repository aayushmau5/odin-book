import { Context } from "node:vm";
import { Arg, Args, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { FriendRequests, Friends } from "../schema/user";

import * as FriendsDb from "../utils/db/friends";
import { getProfileId } from "../utils/db/user";

@Resolver()
export class FriendsResolver {
  @Mutation((returns) => FriendRequests, { nullable: true })
  async sendFriendRequest(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const receiverProfileId = await getProfileId(userId);
    return await FriendsDb.sendFriendRequest(
      ctx.currentProfileId,
      receiverProfileId
    );
  }

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

  @Mutation((returns) => Friends, { nullable: true })
  async unfriendUser(@Arg("userId") userId: string, @Ctx() ctx: Context) {
    const receiverProfileId = await getProfileId(userId);
    return await FriendsDb.unfriend(ctx.currentProfileId, receiverProfileId);
  }
}
