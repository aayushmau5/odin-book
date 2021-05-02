import { AuthenticationError } from "apollo-server-errors";
import { AuthChecker } from "type-graphql";

import { Context } from "../types/context";
import { db_getUser } from "./db/user";
import { verifyJwt } from "./jwt";

export const customAuthChecker: AuthChecker<Context> = async ({ context }) => {
  const { token } = context;
  if (!token) {
    return false;
  }
  const userId = await verifyJwt(token);
  const user = await db_getUser(userId, { profile: true });
  if (!user) {
    return false;
  }
  context.currentUserId = user.id;
  if (user.profile && user.profile.id) {
    context.currentProfileId = user.profile.id;
  } else {
    context.currentProfileId = "";
  }
  return true;
};
