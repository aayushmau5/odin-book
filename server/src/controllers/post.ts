import { getAllPosts, addPost } from "../utils/db/post";

interface Post {
  userId: string;
  data: {
    textData?: string;
    imageUrl?: string;
  };
}

export async function allPosts() {
  return await getAllPosts();
}

export async function savePost({ userId, data }: Post) {
  return await addPost(userId, data);
}
