import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      posts: true,
    },
  });
  return user;
}

export async function getAllUser() {
  const users = await prisma.user.findMany({ include: { posts: true } });
  return users;
}

export async function addUser(
  username: string,
  email: string,
  password: string
) {
  const savedUser = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  return savedUser;
}

// runDb()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
