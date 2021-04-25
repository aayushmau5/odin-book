import { gql } from "apollo-server-express";

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

  type Token {
    user: UserWithoutProfile!
    token: String
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

  type ChangedProfile {
    id: ID!
    firstname: String!
    lastname: String!
    display: String
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
`;

const friendsTypeDefs = `
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
    userId: ID!
  }

  type FriendRequests {
    id: ID!
    friendrequest_to: [requestProfile]
    friendrequest_by: [requestProfile]
  }

  type AcceptedRequests {
    friends: [requestProfile]
  }
`;

const postsTypeDefs = `
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
    text: String
    image: String
  }

  input ProfileData {
    firstname: String
    lastname: String
    display: String
  }

`;

export const typeDefs = gql`
  scalar DateTime

  ${userTypeDefs}
  ${profileTypeDefs}
  ${friendsTypeDefs}
  ${postsTypeDefs}
  ${commentTypeDefs}

  ${inputs}

  type Query {
    getAllUsers: [User]
    getUser(userId: ID!): User
    getAllPosts: [Post]
    getAllPostsByUser(userId: ID!): [Post]
    getFeed: [Post]
    login(data: Login!): Token
  }

  type Mutation {
    signup(data: Signup!): UserWithoutProfile
    createProfile(data: ProfileData!): ChangedProfile!
    updateProfile(data: ProfileData!): ChangedProfile!
    createPost(data: AddPost!): Post!
    createCommentOnPost(postId: ID!, data: String!): Comment!
    createCommentOnComment(postId: ID!, commentId: ID!, data: String!): Comment!
    sendFriendRequest(userId: ID!): FriendRequests
    cancelFriendRequest(userId: ID!): FriendRequests
    acceptFriendRequest(userId: ID!): AcceptedRequests
    unfriendUser(userId: ID!): AcceptedRequests
    likePost(postId: ID!): LikeDislike!
    dislikePost(postId: ID!): LikeDislike!
    deletePost(postId: ID!): Post
    deleteComment(commentId: ID!): Comment
    deleteCurrentUser: User
  }
`;
