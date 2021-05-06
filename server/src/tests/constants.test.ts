import { isProd, isTest } from "../utils/constants";

test("check if Environment variables are correctly setup", () => {
  expect(isProd).toBe(false);
  expect(isTest).toBe(true);
});
