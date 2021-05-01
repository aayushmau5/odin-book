import { ObjectType, Field, ID, Int } from "type-graphql";
import { Profile } from "./user";

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  data?: string;

  @Field({ nullable: true })
  image?: string;

  @Field((returns) => [Profile], { nullable: "items" })
  likes: Profile[];

  @Field((returns) => [Comment], { nullable: "items" })
  comments: Comment[];

  @Field()
  createdAt: Date;
}

@ObjectType()
export class PostWithAuthor extends Post {
  @Field((returns) => Profile)
  author: Profile;
}

@ObjectType()
export class LikeDislike {
  @Field((returns) => [Profile], { nullable: "items" })
  liked_by: Profile[];

  @Field((type) => Int)
  likes: number;
}

@ObjectType()
export class Comment {
  @Field((type) => ID)
  id: string;

  @Field()
  data?: string;

  @Field((type) => Post)
  post: Post;

  @Field((type) => Profile)
  author: Profile;

  @Field((type) => Comment, { nullable: true })
  inReplyTo?: Comment;

  @Field()
  createdAt: Date;
}
