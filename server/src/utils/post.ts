import { prisma } from "./db";

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: { author: true },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getPostByUser(id: string) {
  return await prisma.post.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function generateFeedForUser(userId: string) {
  const userFriends = await prisma.profile.findUnique({
    where: { id: userId },
    select: { friends: { select: { id: true } } },
  });
  if (!userFriends) return false;
  const friendsId = userFriends.friends.map((data) => data.id);
  const feedPosts = await prisma.post.findMany({
    where: {
      authorId: {
        in: friendsId,
      },
    },
    include: { author: true, comments: true },
    orderBy: {
      createdAt: "asc",
    },
  });
  return feedPosts;
}

export async function addPost(
  userId: string,
  postData: { textData?: string; imageUrl?: string }
) {
  const savedPost = await prisma.post.create({
    data: {
      image: postData.imageUrl || null,
      data: postData.textData || null,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return savedPost;
}

export async function removePost(postId: string) {
  const removedPost = await prisma.post.delete({ where: { id: postId } });
  return removedPost;
}

export async function removeAllPostByUser(userId: string) {
  const removedPosts = await prisma.post.deleteMany({
    where: { authorId: userId },
  });
  return removedPosts;
}

export async function likePost(postId: string) {
  await prisma.post.update({
    where: { id: postId },
    data: { likes: { increment: 1 } },
  });
  return true;
}

export async function dislikePost(postId: string) {
  await prisma.post.update({
    where: { id: postId },
    data: { likes: { decrement: 1 } },
  });
  return true;
}
