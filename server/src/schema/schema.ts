import { gql } from "apollo-server-express";

const DemotypeDefs = `
  type Mutation {
    addPost(data: AddPost!): User
    likePost(postId): Count
    dislikePost(postId): Count
    addProfile()
    updateProfile()
    addCommentOnPost(): Comment
    addCommentOnComment(): Comment
    sendFriendRequest()
    cancelFriendRequest()
    acceptFriendRequest()
    unfriend()
  }

  type Subscription {
    chat()
  }
`;

const userTypeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    profile: ProfileWithoutUser
    createdAt: DateTime!
  }

  type UserWithoutProfile {
    id: ID!
    username: String!
    email: String!
    createdAt: DateTime!
  }
`;

const profileTypeDefs = `
  type Profile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    friends: [friendsProfile]
    user: UserWithoutProfile!
    posts: [Post]
    friendrequest_to: [requestProfile]
    friendrequest_by: [requestProfile]
  }

  type ProfileWithoutUser {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    friends: [friendsProfile]
    posts: [PostWithoutAuthor]
    friendrequest_to: [requestProfile]
    friendrequest_by: [requestProfile]
  }

  type friendsProfile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    user: UserWithoutProfile!
    friends_posts: [PostWithoutAuthor]
  }

  type requestProfile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
    user: UserWithoutProfile!
  }
`;

const postsTypeDefs = `
  type Post {
    id: ID!
    data: String
    image: String
    author: Profile!
    likes: Int!
    comments: [Comment]
    createdAt: DateTime!
  }

  type PostWithoutAuthor {
    id: ID!
    data: String
    image: String
    likes: Int!
    comments: [Comment]
    createdAt: DateTime!
  }
`;

const commentTypeDefs = `
  type Comment {
    id: ID!
    data: String!
    post: Post!
    author: Profile!
    inReplyTo: Comment
    createdAt: DateTime!
  }
`;

const inputs = `
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
    data: String!
  }

`;

export const typeDefs = gql`
  scalar DateTime

  ${userTypeDefs}
  ${profileTypeDefs}
  ${postsTypeDefs}
  ${commentTypeDefs}

  ${inputs}

  type Query {
    users: [User]
    user(id: ID!): User
    profiles: [Profile]
    profile(id: ID!): Profile
    posts: [Post]
    postsByProfile(id: ID!): [Post]
    feed: [Post]
    getFriends(id: ID!): [Profile]
    getFriendRequests: [Profile]
    login(data: Login!): User
  }

  type Mutation {
    signup(data: Signup!): UserWithoutProfile
  }
`;
