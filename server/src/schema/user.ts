import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Profile {
  @Field((type) => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  display: string;

  @Field((type) => [Profile], { nullable: "items" })
  friends?: Profile[];

  @Field((type) => [Profile], { nullable: "items" })
  friendrequest_to?: Profile[];

  @Field((type) => [Profile], { nullable: "items" })
  friendrequest_by?: Profile[];
}

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  profile?: Profile;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Token {
  @Field()
  user: User;

  @Field()
  token: string;
}
