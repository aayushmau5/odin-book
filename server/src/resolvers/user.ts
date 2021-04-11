import { allUsers, getSpecificUser, saveUser } from "../controllers/user";
import { ValidationError } from "apollo-server-express";

export const users = allUsers;

export const user = async (_: any, { id }: { id: string }) => {
  try {
    return await getSpecificUser(id);
  } catch (err) {
    console.log(err);
    return new ValidationError("Invalid Id");
  }
};

export const signup = async (
  _: any,
  args: { user: { username: string; email: string; password: string } }
) => {
  return await saveUser(args.user);
};
