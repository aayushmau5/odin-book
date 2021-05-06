import faker from "faker";

import { prisma } from "../utils/db/db";
import { addUser } from "../utils/db/user";

test("Add user", async () => {
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await expect(
    addUser(userData.email, userData.password)
  ).resolves.toMatchObject({
    email: userData.email,
  });
});

afterAll(() => {
  prisma.$disconnect();
});
