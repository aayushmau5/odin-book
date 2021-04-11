import { users, user, signup } from "./user";
import { posts, addPost } from "./post";

function returnIdAndUsername() {
  console.log("this ran");
  return {
    id: 1001,
    username: "username",
  };
}

export const resolvers = {
  Query: {
    users: () => ({
      ...users(),
    }),
    user,
    // posts,
    demo: () => ({
      ...returnIdAndUsername(),
      // id: () => {
      //   console.log("Resolver id ran");
      //   return 1001
      // },
      email: () => {
        console.log("Resolver email ran");
        return "email";
      },
    }),
  },
  Mutation: {
    signup,
    addPost,
  },
};
