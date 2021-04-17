import { allPosts, savePost } from "../controllers/post";

export const posts = allPosts;

export const addPost = async (
  _: any,
  args: { data: { userId: string; data: any } }
) => {
  return await savePost(args.data);
};
