import { ArgsType, Field, InputType } from "type-graphql";
import { Post } from "./post";
import { BaseProfile } from "./user";

@ArgsType()
export class UserInputArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ArgsType()
export class OAuthInput {
  @Field()
  idToken: string;
}

@InputType()
export class ProfileInput implements Partial<BaseProfile> {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  display: string;
}

@InputType()
export class PostInput implements Partial<Post> {
  @Field({ nullable: true })
  data?: string;

  @Field({ nullable: true })
  image?: string;
}
