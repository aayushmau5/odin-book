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

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: { author: true, comments: true },
  });
}

export async function addPost(userId: string, postData: string) {
  const savedPost = await prisma.post.create({
    data: {
      data: postData,
      authorId: userId,
    },
  });
  return savedPost;
}
