import { getAllUser, getUser, addUser } from "./utils/db";

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
  },
};
