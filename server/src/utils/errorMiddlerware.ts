import { Prisma } from "@prisma/client";
import { UserInputError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";

export const ErrorInterceptor: MiddlewareFn<any> = async ({}, next) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2001":
          throw new UserInputError("Record does not exist");
        case "P2002":
          throw new UserInputError("Email already present");
        default:
          throw new UserInputError(err.message);
      }
    }
    throw err;
  }
};
