import { gql } from "apollo-server-express";

const postTypeDefs = gql`
  type Post {
    id: ID!
    data: String
    image: String
    author: Profile!
    likes: [Profile]
    comments: [Comment]
    createdAt: DateTime!
  }

  type PostWithoutAuthor {
    id: ID!
    data: String
    image: String
    likes: [Profile]
    comments: [Comment]
    createdAt: DateTime!
  }

  type LikeDislike {
    liked_by: [Profile]
    likes: Int!
  }
  type Comment {
    id: ID!
    data: String!
    post: Post!
    author: Profile!
    inReplyTo: Comment
    createdAt: DateTime!
  }
`;

export default postTypeDefs;
