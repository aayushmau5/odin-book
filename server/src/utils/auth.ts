import { AuthenticationError } from "apollo-server-errors";
import { getUser, getUserByEmail } from "./db/user";

export const authenticateUsingEmail = async (email: string) => {
  const user = await getUserByEmail(email, { profile: true });
  if (!user) {
    throw new AuthenticationError("Invalid User");
  }
  return user;
};

export const autheticateUsingId = async (userId: string) => {
  const user = await getUser(userId, { profile: true });
  if (!user) {
    if (!user) {
      throw new AuthenticationError("Invalid User");
    }
  }
  return user;
};
