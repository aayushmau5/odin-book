import { Prisma } from "@prisma/client";
import { UserInputError } from "apollo-server-errors";

export function handlePrismaError(e: Error): Error {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    switch (e.code) {
      case "P2001":
        throw new UserInputError("Record does not exist");
      case "P2002":
        throw new UserInputError("Email already present");
      default:
        throw new UserInputError(e.message);
    }
  }
  throw e;
}
