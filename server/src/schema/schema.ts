import { gql } from "apollo-server-express";

const DemotypeDefs = `
  scalar DateTime
  
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

  input Login {
    email: String!
    password: String!
  }

  input AddPost {
    userId: ID!
    data: String!
  }

  type Query {
    // user(id: ID!): User
    users: [User]
    // profiles: [Profile]
    // profile(id: ID!): Profile
    // postsByProfile(id: ID!): [Post]
    // feedForProfile(id: ID!): [Post]
    // getFriends(id: ID!): [Profile]
    // getFriendRequests(id: ID!): [Profile]
  }

  // type Mutation {
  //   signup(user: Signup!): User
  //   login(user: Login!): User
  //   addPost(data: AddPost!): User
  //   addProfile()
  //   updateProfile()
  //   addCommentOnPost(): Comment
  //   addCommentOnComment(): Comment
  //   sendFriendRequest()
  //   cancelFriendRequest()
  //   acceptFriendRequest()
  //   unfriend()
  // }

  // type Subscription {
  //   chat()
  // }
`;

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    username: String!
    email: String!
    profile: Profile
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

  input Login {
    email: String!
    password: String!
  }

  input AddPost {
    userId: ID!
    data: String!
  }

  type Query {
    users: [User]
    profiles: [Profile]
  }
`;
