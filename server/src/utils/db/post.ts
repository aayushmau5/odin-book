import { prisma } from "./db";

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: { author: true },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function getPostByProfile(id: string) {
  return await prisma.post.findMany({
    where: {
      authorId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function generateFeedForUser(profileId: string) {
  const userFriends = await prisma.profile.findUnique({
    where: { id: profileId },
    select: { friends: { select: { id: true } } },
  });
  if (!userFriends) return false; //TODO throw Error
  const friendsId = userFriends.friends.map((data) => data.id);
  const feedPosts = await prisma.post.findMany({
    where: {
      authorId: {
        in: friendsId,
      },
    },
    include: { author: true, comments: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return feedPosts;
}

export async function savePost(
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
