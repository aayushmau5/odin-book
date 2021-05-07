import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Info,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { compare, hash } from "bcryptjs";

import * as UserDb from "../utils/db/user";
import { ProfileInput, UserInputArgs, OAuthInput } from "../schema/inputs";
import {
  BaseProfile,
  Profile,
  SearchedUser,
  Token,
  User,
  UserWithoutProfile,
} from "../schema/user";
import { Context } from "../types/context";
import { checkForSelectionField } from "../utils/getSelections";
import { verifyGoogleId } from "../utils/google-id-verification";
import { generateJwt } from "../utils/jwt";
import { removeAllCommentsByUser } from "../utils/db/comment";
import { removeAllPostByUser } from "../utils/db/post";

const selectionsForUser = [
  //type of selections a User can make on a query
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
  async getAllUsers(@Info() info: any): Promise<User[]> {
    return await UserDb.db_getAllUsers(
      checkForSelectionField(info, selectionsForUser)
    );
  }

  @Query((returns) => User, { nullable: true })
  async getUser(
    @Arg("userId") userId: string,
    @Info() info: any
  ): Promise<User | null> {
    return await UserDb.db_getUser(
      userId,
      checkForSelectionField(info, selectionsForUser)
    );
  }

  @Query((returns) => [SearchedUser], { nullable: true })
  async searchUser(
    @Arg("searchString") searchString: string
  ): Promise<SearchedUser[]> {
    return await UserDb.searchUser(searchString);
  }

  @Query((returns) => Token, { nullable: true })
  async login(
    @Args() { email, password }: UserInputArgs,
    @Info() info: any
  ): Promise<Token | null> {
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
  async oauthLogin(
    @Args() { idToken }: OAuthInput,
    @Info() info: any
  ): Promise<Token | null> {
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
  async signup(
    @Args() { email, password }: UserInputArgs
  ): Promise<Token | null> {
    const hashedPassword = await hash(password, 16);
    const user = await UserDb.addUser(email, hashedPassword);
    const token = await generateJwt(user.id);
    return { user, token };
  }

  @Mutation((returns) => Token, { nullable: true })
  async oauthSignup(@Args() { idToken }: OAuthInput): Promise<Token | null> {
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

  @Authorized()
  @Mutation((returns) => BaseProfile)
  async createProfile(
    @Arg("data") profileData: ProfileInput,
    @Ctx() ctx: Context
  ): Promise<BaseProfile> {
    const userId = ctx.currentUserId;
    return await UserDb.setProfile(userId, profileData);
  }

  @Authorized()
  @Mutation((returns) => BaseProfile)
  async updateProfile(
    @Arg("data") profileData: ProfileInput,
    @Ctx() ctx: Context
  ): Promise<BaseProfile> {
    return await UserDb.updateCommonProfile(ctx.currentProfileId, profileData);
  }

  @Authorized()
  @Mutation((returns) => UserWithoutProfile, { nullable: true })
  async deleteCurrentUser(@Ctx() ctx: Context): Promise<UserWithoutProfile> {
    const { currentUserId, currentProfileId } = ctx;
    await removeAllCommentsByUser(currentProfileId);
    await removeAllPostByUser(currentProfileId);
    await UserDb.deleteProfile(currentProfileId);
    return await UserDb.deleteUser(currentUserId);
  }
}

@Resolver(BaseProfile)
export class BaseProfileFieldResolvers {
  //Field resolver for BaseProfile Schema
  @FieldResolver((type) => String)
  fullName(@Root() profile: Profile) {
    return `${profile.firstname} ${profile.lastname}`;
  }
}
