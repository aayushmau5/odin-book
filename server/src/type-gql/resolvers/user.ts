import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as UserDb from "../../utils/db/user";
import { ProfileInput, SignupArgs } from "../schema/input";
import { Profile, Token, User } from "../schema/user";

interface Context {
  userId: string;
  profileId: string;
}

@Resolver()
export class UserResolver {
  @Query((returns) => [User])
  async getAllUsers() {
    return await UserDb.db_getAllUsers({ profile: true });
  }

  @Query((returns) => User, { nullable: true })
  async getUser(@Arg("userId") userId: string) {
    return await UserDb.db_getUser(userId, { profile: true });
  }

  @Query((returns) => Token, { nullable: true })
  async login(@Args() { email, password }: SignupArgs) {
    return await UserDb.getUserByEmail(email, {});
  }

  @Mutation((returns) => User)
  async signup(@Args() { email, password }: SignupArgs) {
    return await UserDb.addUser(email, password);
  }

  @Mutation((returns) => Profile)
  async createProfile(
    @Arg("data") profileData: ProfileInput,
    @Ctx() ctx: Context
  ) {
    const userId = ctx.profileId;
    return await UserDb.setProfile(userId, profileData);
  }
}
