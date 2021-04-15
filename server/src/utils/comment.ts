import { prisma } from "./db";

export async function addCommentToPost(
  profileId: string,
  postId: string,
  data: string
) {
  const comment = await prisma.comment.create({
    data: {
      data: data,
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: profileId,
        },
      },
    },
  });
  return comment;
}

export async function addCommentOnComment(
  postId: string,
  commentId: string,
  userId: string,
  data: string
) {
  const comment = await prisma.comment.create({
    data: {
      data,
      author: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: { id: postId },
      },
      inReplyTo: { connect: { id: commentId } },
    },
  });
  return comment;
}

export async function getCommentsOnPost(postId: string) {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: {
      inReplyTo: true,
    },
  });
  return comments;
}

export async function removeComment(id: string) {
  const removedComment = await prisma.comment.delete({ where: { id } });
  return removedComment;
}