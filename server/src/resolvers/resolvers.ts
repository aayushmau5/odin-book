import { Kind, GraphQLScalarType } from "graphql";

import {
  getAllUsers,
  getUser,
  createProfile,
  updateProfile,
  login,
  oauthLogin,
  signup,
  oauthSignup,
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
    getAllUsers: errorHandlerWrapper(getAllUsers),
    getUser: errorHandlerWrapper(getUser),
    getAllPosts: errorHandlerWrapper(getAllPosts),
    getAllPostsByUser: errorHandlerWrapper(getAllPostsByUser),
    getFeed: authenticate(getFeed),
    login: errorHandlerWrapper(login),
    oauthLogin: errorHandlerWrapper(oauthLogin),
  },
  Mutation: {
    signup: errorHandlerWrapper(signup),
    oauthSignup: errorHandlerWrapper(oauthSignup),
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
