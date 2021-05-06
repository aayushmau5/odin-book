import { PrismaClient } from "@prisma/client";

import { isProd, isTest, testDbUrl } from "../constants";

const config: any = {
  log: isProd || isTest ? [] : ["query"],
  datasources: isTest
    ? {
        db: {
          url: testDbUrl,
        },
      }
    : null,
};

export const prisma = new PrismaClient(config);
