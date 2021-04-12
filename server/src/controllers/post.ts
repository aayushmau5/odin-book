import { getAllPosts, addPost } from "../utils/post";

interface Post {
  userId: string;
  data: string;
}

export async function allPosts() {
  return await getAllPosts();
}

export async function savePost({ userId, data }: Post) {
  return await addPost(userId, data);
}
