import { AuthenticationError } from "apollo-server-errors";
import { verify } from "jsonwebtoken";
import { db_getUser } from "./db/user";

export const authenticate = (next: any) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const { currentUserId } = context;
  try {
    if (!currentUserId) {
      throw new AuthenticationError("Invalid User");
    }
    const user = await db_getUser(currentUserId, { profile: true });
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
