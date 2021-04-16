import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    profile: Profile
    posts: [Post]
    createdAt: DateTime!
  }

  type Profile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    friends: [Profile]
    user: User!
    friendrequest_to: [Profile]
    friendrequest_by: [Profile]
  }

  type Post {
    id: ID!
    data: String
    image: String
    author: User!
    likes: Int!
    comments: [Comment]
    createdAt: DateTime!
  }

  type Comment {
    id: ID!
    data: String!
    post: Post!
    author: Profile!
    inReplyTo: Comment
    createdAt: DateTime!
  }

  input Signup {
    username: String!
    email: String!
    password: String!
  }

  input AddPost {
    userId: ID!
    data: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    profiles: [Profile]
    profile(id: ID!): Profile
    postsByProfile(id: ID!): [Post]
    feedForProfile(id: ID!): [Post]
  }

  type Mutation {
    signup(user: Signup!): User
    addPost(data: AddPost!): User
  }
`;
