import { getAllUser, getUser, addUser, addPost } from "../utils/db";

export const resolvers = {
  Query: {
    users: async () => await getAllUser(),
    user: async (_: any, { id }: { id: string }) => await getUser(id),
  },
  Mutation: {
    signup: async (
      _: any,
      args: { user: { username: string; email: string; password: string } }
    ) => {
      const { username, email, password } = args.user;
      return await addUser(username, email, password);
    },
    addPost: async (
      _: any,
      args: { data: { userId: string; data: string } }
    ) => {
      const { userId, data } = args.data;
      return await addPost(userId, data);
    },
  },
};
