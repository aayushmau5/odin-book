import { prisma } from "./db";
import { postSelection } from "./selections";

export async function getAllPosts(selections: {
  author?: boolean;
  user?: boolean;
}) {
  return await prisma.post.findMany({
    include: postSelection(selections),
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostByProfile(
  id: string,
  selections: { author?: boolean; user?: boolean }
) {
  return await prisma.post.findMany({
    where: {
      authorId: id,
    },
    include: postSelection(selections),
    orderBy: {
      createdAt: "desc",
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
    include: {
      _count: {
        select: { comments: true },
      },
      author: {
        include: {
          user: true,
        },
      },
      comments: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return feedPosts;
}

export async function savePost(
  profileId: string,
  postData: { textData?: string; imageUrl?: string }
) {
  const savedPost = await prisma.post.create({
    data: {
      image: postData.imageUrl || null,
      data: postData.textData || null,
      author: {
        connect: {
          id: profileId,
        },
      },
    },
  });
  return savedPost;
}

export async function removePost(postId: string) {
  const removedPost = await prisma.post.delete({
    where: { id: postId },
  });
  return removedPost;
}

export async function removeAllPostByUser(userId: string) {
  const removedPosts = await prisma.post.deleteMany({
    where: { authorId: userId },
  });
  return removedPosts;
}

// TODO add the ability to store the liked/disliked users
export async function increaseLike(postId: string) {
  return await prisma.post.update({
    where: { id: postId },
    data: { likes: { increment: 1 } },
    select: { likes: true },
  });
}

export async function decreaseLike(postId: string) {
  return await prisma.post.update({
    where: { id: postId },
    data: { likes: { decrement: 1 } },
    select: { likes: true },
  });
}
