import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserWithoutProfile {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class BaseProfile {
  @Field((type) => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  display: string;
}

@ObjectType()
export class ProfileWithoutUser extends BaseProfile {
  @Field((type) => [Profile], { nullable: "items" })
  friends?: Profile[];

  @Field((type) => [Profile], { nullable: "items" })
  friendrequest_to?: Profile[];

  @Field((type) => [Profile], { nullable: "items" })
  friendrequest_by?: Profile[];
}

@ObjectType()
export class User extends UserWithoutProfile {
  @Field({ nullable: true })
  profile?: ProfileWithoutUser;
}

@ObjectType()
export class Token {
  @Field()
  user: User;

  @Field()
  token: string;
}

@ObjectType()
export class Profile extends ProfileWithoutUser {
  @Field((type) => UserWithoutProfile)
  user: UserWithoutProfile;
}

@ObjectType()
export class RequestProfile extends BaseProfile {
  @Field((type) => ID)
  userId: string;
}

@ObjectType()
export class FriendRequests {
  @Field((type) => ID)
  id: string;

  @Field((returns) => [RequestProfile], { nullable: "items" })
  friendrequest_to: RequestProfile[];

  @Field((returns) => [RequestProfile], { nullable: "items" })
  friendrequest_by: RequestProfile[];
}

@ObjectType()
export class Friends {
  @Field((returns) => [RequestProfile], { nullable: "items" })
  friends: RequestProfile[];
}
