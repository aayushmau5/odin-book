import { saveUser } from "../controllers/user";
import { getAllUser, getUser } from "../utils/user";
import { ValidationError } from "apollo-server-express";

export const users = getAllUser;

export const user = async (_: any, { id }: { id: string }) => {
  try {
    return await getUser(id);
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
