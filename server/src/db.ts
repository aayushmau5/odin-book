import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runDb() {
  await prisma.user.create({
    data: {
      email: "demo@gmail.com",
      username: "demo",
    },
  });
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

runDb()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
