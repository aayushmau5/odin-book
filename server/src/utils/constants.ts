export const isProd = process.env.NODE_ENV === "production";

export const isTest = process.env.NODE_ENV === "test";

export const testDbUrl =
  "postgresql://aayushmau5:password@localhost:5432/odinbook_test?schema=public";
