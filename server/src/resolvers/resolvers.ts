import { Kind, GraphQLScalarType } from "graphql";

import { users, user, addProfile, updateProfile, signup, login } from "./user";
import {
  posts,
  postsByUser,
  addPost,
  feed,
  likePost,
  dislikePost,
  addCommentOnPost,
  addCommentOnComment,
} from "./post";
import {
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  unfriend,
} from "./friends";

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
    users,
    user,
    posts,
    postsByUser,
    feed,
    login,
  },
  Mutation: {
    signup,
    addProfile,
    updateProfile,
    addPost,
    addCommentOnPost,
    addCommentOnComment,
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    unfriend,
    likePost,
    dislikePost,
  },
};
