import { SelectionsOnPost } from "../../types/selectionTypes";
import { prisma } from "./db";
import { postSelection } from "./selections";
import { PostInput } from "../../schema/inputs";

export async function db_getAllPosts(selections: SelectionsOnPost) {
  return await prisma.post.findMany({
    include: postSelection(selections),
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostByProfile(
  id: string,
  selections: SelectionsOnPost
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

export async function getSinglePost(postId: string) {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });
}

export async function generateFeedForUser(profileId: string) {
  const userFriends = await prisma.profile.findUnique({
    where: { id: profileId },
    select: { friends: { select: { id: true } } },
  });
  if (!userFriends) return [];
  const friendsId = userFriends.friends.map((data) => data.id);
  const feedPosts = await prisma.post.findMany({
    where: {
      authorId: {
        in: friendsId,
      },
    },
    include: {
      _count: {
        select: { likes: true, comments: true },
      },
      likes: true,
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

export async function savePost(profileId: string, postData: PostInput) {
  const savedPost = await prisma.post.create({
    data: {
      image: postData.image || null,
      data: postData.data || null,
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

export async function increaseLike(profileId: string, postId: string) {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        connect: {
          id: profileId,
        },
      },
    },
    select: { likes: true, _count: { select: { likes: true } } },
  });
}

export async function decreaseLike(profileId: string, postId: string) {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        disconnect: {
          id: profileId,
        },
      },
    },
    select: { likes: true, _count: { select: { likes: true } } },
  });
}
