import { buildSchema } from "type-graphql";

import { FriendsResolver } from "./friends";
import { PostsResolver } from "./post";
import { UserResolver, BaseProfileFieldResolvers } from "./user";
import { customAuthChecker } from "../utils/auth";
import { ErrorInterceptor } from "../utils/errorMiddlerware";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      FriendsResolver,
      PostsResolver,
      BaseProfileFieldResolvers,
    ],
    authChecker: customAuthChecker,
    globalMiddlewares: [ErrorInterceptor],
  });
