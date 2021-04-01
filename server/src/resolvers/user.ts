import { allUsers, getSpecificUser, saveUser } from "../controllers/user";

export const users = allUsers;

export const user = async (_: any, { id }: { id: string }) => {
  return await getSpecificUser(id);
};

export const signup = async (
  _: any,
  args: { user: { username: string; email: string; password: string } }
) => {
  return await saveUser(args.user);
};
