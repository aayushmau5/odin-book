import { PrismaClient } from "@prisma/client";
import { isProd } from "../constants";

const log: any = isProd ? {} : { log: ["query"] };

export const prisma = new PrismaClient(log);
