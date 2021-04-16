import { users, user, signup } from "./user";
import { posts, addPost } from "./post";

export const resolvers = {
  Query: {
    users: async () => ({
      ...(await users()),
    }),
    user,
  },
  Mutation: {
    signup,
    addPost,
  },
};
