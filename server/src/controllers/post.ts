import { getAllPosts, addPost } from "../utils/db";

export async function allPosts() {
  return await getAllPosts();
}

export async function savePost({
  userId,
  data,
}: {
  userId: string;
  data: string;
}) {
  return await addPost(userId, data);
}
