import { handlePrismaError } from "./prismaErrorHandler";

export const errorHandlerWrapper = (next: Function) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  try {
    return await next(parent, args, context, info);
  } catch (err) {
    return handlePrismaError(err);
  }
};
