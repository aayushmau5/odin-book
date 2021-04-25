import { Kind, GraphQLScalarType } from "graphql";

import {
  getAllUsers,
  getUser,
  createProfile,
  updateProfile,
  signup,
  login,
  deleteCurrentUser,
} from "./user";

import {
  getAllPosts,
  getAllPostsByUser,
  createPost,
  getFeed,
  likePost,
  dislikePost,
  createCommentOnPost,
  createCommentOnComment,
  deletePost,
  deleteComment,
} from "./post";

import {
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  unfriendUser,
} from "./friends";
import { authenticate } from "../utils/auth";

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
    getAllUsers,
    getUser,
    getAllPosts,
    getAllPostsByUser,
    getFeed: authenticate(getFeed),
    login,
  },
  Mutation: {
    signup,
    createProfile: authenticate(createProfile),
    updateProfile: authenticate(updateProfile),
    createPost: authenticate(createPost),
    createCommentOnPost: authenticate(createCommentOnPost),
    createCommentOnComment: authenticate(createCommentOnComment),
    sendFriendRequest: authenticate(sendFriendRequest),
    cancelFriendRequest: authenticate(cancelFriendRequest),
    acceptFriendRequest: authenticate(acceptFriendRequest),
    unfriendUser: authenticate(unfriendUser),
    likePost: authenticate(likePost),
    dislikePost: authenticate(dislikePost),
    deletePost: authenticate(deletePost),
    deleteComment: authenticate(deleteComment),
    deleteCurrentUser: authenticate(deleteCurrentUser),
  },
};
