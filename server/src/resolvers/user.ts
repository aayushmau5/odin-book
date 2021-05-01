import { Arg, Args, Ctx, Info, Mutation, Query, Resolver } from "type-graphql";
import { compare, hash } from "bcryptjs";

import * as UserDb from "../utils/db/user";
import { ProfileInput, UserInputArgs, OAuthInput } from "../schema/inputs";
import { Profile, Token, User } from "../schema/user";
import { Context } from "../types/context";
import { checkForSelectionField } from "../utils/getSelections";
import { verifyGoogleId } from "../utils/google-id-verification";
import { generateJwt } from "../utils/jwt";
import { removeAllCommentsByUser } from "../utils/db/comment";
import { removeAllPostByUser } from "../utils/db/post";

const selectionsForUser = [
  "profile",
  "posts",
  "comments",
  "friends",
  "friends_posts",
  "friendsrequest_to",
];

@Resolver()
export class UserResolver {
  @Query((returns) => [User])
  async getAllUsers(@Info() info: any) {
    return await UserDb.db_getAllUsers(
      checkForSelectionField(info, selectionsForUser)
    );
  }

  @Query((returns) => User, { nullable: true })
  async getUser(@Arg("userId") userId: string, @Info() info: any) {
    return await UserDb.db_getUser(
      userId,
      checkForSelectionField(info, selectionsForUser)
    );
  }

  @Query((returns) => Token, { nullable: true })
  async login(@Args() { email, password }: UserInputArgs, @Info() info: any) {
    const user = await UserDb.getUserByEmail(
      email,
      checkForSelectionField(info, selectionsForUser)
    );
    if (!user) return null;
    if (!user.password) return null;
    const result = await compare(password, user.password);
    if (!result) {
      return null;
    }
    const token = await generateJwt(user.id);
    return { user, token };
  }

  @Query((returns) => Token, { nullable: true })
  async oauthLogin(@Args() { idToken }: OAuthInput, @Info() info: any) {
    const payload = await verifyGoogleId(idToken);
    if (payload && payload.email) {
      let email = payload.email;
      const user = await UserDb.getUserByEmail(
        email,
        checkForSelectionField(info, selectionsForUser)
      );
      if (!user) {
        return null;
      }
      const token = await generateJwt(user.id);
      return { user, token };
    } else {
      return null;
    }
  }

  @Mutation((returns) => Token, { nullable: true })
  async signup(@Args() { email, password }: UserInputArgs) {
    const hashedPassword = await hash(password, 16);
    const user = await UserDb.addUser(email, hashedPassword);
    const token = await generateJwt(user.id);
    return { user, token };
  }

  @Mutation((returns) => Token, { nullable: true })
  async oauthSignup(@Args() { idToken }: OAuthInput) {
    const payload = await verifyGoogleId(idToken);
    if (payload && payload.email) {
      let email = payload.email;
      const user = await UserDb.addOAuthUser(email, idToken);
      const token = await generateJwt(user.id);
      return { user, token };
    } else {
      return null;
    }
  }

  @Mutation((returns) => Profile)
  async createProfile(
    @Arg("data") profileData: ProfileInput,
    @Ctx() ctx: Context
  ) {
    const userId = ctx.currentUserId;
    return await UserDb.setProfile(userId, profileData);
  }

  @Mutation((returns) => Profile)
  async updateProfile(
    @Arg("data") profileData: ProfileInput,
    @Ctx() ctx: Context
  ) {
    return await UserDb.updateCommonProfile(ctx.currentProfileId, profileData);
  }

  @Mutation((returns) => User, { nullable: true })
  async deleteCurrentUser(@Ctx() ctx: Context) {
    const { currentUserId, currentProfileId } = ctx;
    await removeAllCommentsByUser(currentProfileId);
    await removeAllPostByUser(currentProfileId);
    await UserDb.deleteProfile(currentProfileId);
    return await UserDb.deleteUser(currentUserId);
  }
}
