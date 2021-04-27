import { gql } from "apollo-server-core";
import userTypeDefs from "./user";
import postTypeDefs from "./post";
import inputs from "./inputs";

const mainTypeDefs = gql`
  scalar DateTime

  type Query {
    getAllUsers: [User]
    getUser(userId: ID!): User
    getAllPosts: [Post]
    getAllPostsByUser(userId: ID!): [Post]
    getFeed: [Post]
    login(data: Login!): Token
    oauthLogin(data: OAuthInput!): Token
  }

  type Mutation {
    signup(data: Signup!): Token
    oauthSignup(data: OAuthInput): Token
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

export const schema = [userTypeDefs, postTypeDefs, inputs, mainTypeDefs];
