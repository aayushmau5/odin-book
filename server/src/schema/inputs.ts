import { MinLength, IsEmail, Length } from "class-validator";
import { ArgsType, Field, InputType } from "type-graphql";

import { Post } from "./post";
import { BaseProfile } from "./user";

@ArgsType()
export class UserInputArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(5)
  password: string;
}

@ArgsType()
export class OAuthInput {
  @Field()
  @MinLength(5)
  idToken: string;
}

@InputType()
export class ProfileInput implements Partial<BaseProfile> {
  @Field()
  @Length(1, 50)
  firstname: string;

  @Field()
  @Length(1, 50)
  lastname: string;

  @Field()
  display: string;
}

@InputType()
export class PostInput implements Partial<Post> {
  @Field({ nullable: true })
  @MinLength(2)
  data?: string;

  @Field({ nullable: true })
  @MinLength(2)
  image?: string;
}
