import { Kind, GraphQLScalarType } from "graphql";

import * as UserResolvers from "./user";
import * as PostResolvers from "./post";
import * as FriendsResolvers from "./friends";
import { authenticate } from "../utils/auth";
import { errorHandlerWrapper } from "../utils/errorHandler";

// Custome "DateTime" Scalar
const dateScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "Date custom scalar type",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

export const resolvers = {
  DateTime: dateScalar,
  Query: {
    getAllUsers: authenticate(UserResolvers.getAllUsers),
    getUser: authenticate(UserResolvers.getUser),
    getAllPosts: authenticate(PostResolvers.getAllPosts),
    getAllPostsByUser: authenticate(PostResolvers.getAllPostsByUser),
    getFeed: authenticate(PostResolvers.getFeed),
    login: errorHandlerWrapper(UserResolvers.login),
    oauthLogin: errorHandlerWrapper(UserResolvers.oauthLogin),
  },
  Mutation: {
    signup: errorHandlerWrapper(UserResolvers.signup),
    oauthSignup: errorHandlerWrapper(UserResolvers.oauthSignup),
    createProfile: authenticate(UserResolvers.createProfile),
    updateProfile: authenticate(UserResolvers.updateProfile),
    createPost: authenticate(PostResolvers.createPost),
    createCommentOnPost: authenticate(PostResolvers.createCommentOnPost),
    createCommentOnComment: authenticate(PostResolvers.createCommentOnComment),
    sendFriendRequest: authenticate(FriendsResolvers.sendFriendRequest),
    cancelFriendRequest: authenticate(FriendsResolvers.cancelFriendRequest),
    acceptFriendRequest: authenticate(FriendsResolvers.acceptFriendRequest),
    unfriendUser: authenticate(FriendsResolvers.unfriendUser),
    likePost: authenticate(PostResolvers.likePost),
    dislikePost: authenticate(PostResolvers.dislikePost),
    deletePost: authenticate(PostResolvers.deletePost),
    deleteComment: authenticate(PostResolvers.deleteComment),
    deleteCurrentUser: authenticate(UserResolvers.deleteCurrentUser),
  },
};
