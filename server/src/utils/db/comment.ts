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

export async function commentOnComment(
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
  const comment = await prisma.comment.findUnique({
    where: { id },
    select: { repliedBy: true },
  });
  if (comment?.repliedBy.length === 0) {
    const removedComment = await prisma.comment.delete({ where: { id } });
    return removedComment;
  }
  return await prisma.comment.update({
    where: { id },
    data: { data: "<DELETED>", authorId: { set: "<DELETED>" } },
  });
}

export async function getSingleComment(id: string) {
  return await prisma.comment.findUnique({
    where: { id },
    include: {
      author: true,
    },
  });
}

export async function removeAllCommentsByUser(profileId: string) {
  const comments = await prisma.comment.findMany({
    where: { authorId: profileId },
  });
  comments.forEach(async (comment) => {
    await removeComment(comment.id);
  });
}
