import { AuthenticationError } from "apollo-server-errors";
import { db_getUser } from "./db/user";
import { verifyJwt } from "./jwt";

export const authenticate = (next: any) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { token } = context;
  try {
    if (!token) {
      throw new AuthenticationError("Unauthenticated");
    }
    const userId = verifyJwt(token);
    const user = await db_getUser(userId, { profile: true });
    if (!user) {
      throw new AuthenticationError("Invalid User");
    }
    context.currentUserId = user.id;
    context.currentProfileId = user.profile?.id;
    return next(parent, args, context, info);
  } catch (err) {
    return err;
  }
};
