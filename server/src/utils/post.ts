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

export async function generateFeed(userId: string) {
  const feed: any[] = [];
  const user = await prisma.profile.findUnique({
    where: { id: userId },
    include: { friends: true },
  });
  user?.friends.forEach(async (data) => {
    const posts = await prisma.post.findMany({
      where: { authorId: data.id },
      include: { author: true, comments: true },
      orderBy: {
        createdAt: "asc",
      },
    });
    feed.push(posts);
  });
  return feed;
}

export async function addPost(
  userId: string,
  postData: { textData: string; imageUrl: string }
) {
  const savedPost = await prisma.post.create({
    data: {
      image: postData.imageUrl || null,
      data: postData.textData || null,
      authorId: userId,
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
  const likedPost = await prisma.post.update({
    where: { id: postId },
    data: { likes: { increment: 1 } },
  });
  return likedPost;
}

export async function dislikePost(postId: string) {
  const likedPost = await prisma.post.update({
    where: { id: postId },
    data: { likes: { decrement: 1 } },
  });
  return likedPost;
}
