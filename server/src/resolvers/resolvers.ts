import { users, user, signup } from "./user";
import { posts, addPost } from "./post";

export const resolvers = {
  Query: {
    users,
    user,
    posts,
  },
  Mutation: {
    signup,
    addPost,
  },
};
