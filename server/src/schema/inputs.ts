import { ArgsType, Field, ID, InputType } from "type-graphql";
import { Profile } from "./user";

@ArgsType()
export class SignupArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ArgsType()
export class ProfileArgs {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  display: string;

  @Field((type) => ID)
  userId: string;
}

@InputType()
export class ProfileInput implements Partial<Profile> {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  display: string;
}
