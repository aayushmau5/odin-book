import { prisma } from "./db";

export async function addCommentToPost(
  userId: string,
  postId: string,
  data: string
) {
  const comment = await prisma.comment.create({
    data: { data, postId, authorId: userId },
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
  });
  return comments;
}

export async function removeComment(id: string) {
  const removedComment = await prisma.comment.delete({ where: { id } });
  return removedComment;
}
