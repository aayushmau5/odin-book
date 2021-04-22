import { savePost } from "../utils/db/post";
import {
  getAllPosts,
  getPostByProfile,
  generateFeedForUser,
} from "../utils/db/post";

export const posts = async () => {
  return await getAllPosts();
};

export const addPost = async (_: any, args: { data: { data: any } }) => {
  // GET ID from Auth
  const userId = "";
  const data = args.data.data;
  // TODO validate the data
  return await savePost(userId, data);
};

export const postsByProfile = async (_: any, { id }: { id: string }) => {
  return await getPostByProfile(id);
};

export const feed = async () => {
  // GET ID from Auth
  const id = "";
  return await generateFeedForUser(id);
};
