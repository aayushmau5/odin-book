import { ObjectType, Field, ID, Int } from "type-graphql";
import { Profile } from "./user";

@ObjectType()
export class BasePost {
  @Field((type) => ID)
  id: string;

  @Field((type) => String, { nullable: true })
  data?: string | null;

  @Field((type) => String, { nullable: true })
  image?: string | null;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Post extends BasePost {
  @Field((returns) => [Profile], { nullable: "items" })
  likes: Profile[];

  @Field((returns) => [Comment], { nullable: "items" })
  comments: Comment[];
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
  likes?: number;
}

@ObjectType()
export class BaseComment {
  @Field((type) => ID)
  id: string;

  @Field()
  data?: string;

  @Field((type) => Post)
  post: BasePost;

  @Field((type) => Comment, { nullable: true })
  inReplyTo?: BaseComment;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Comment extends BaseComment {
  @Field((type) => Profile)
  author: Profile;
}
