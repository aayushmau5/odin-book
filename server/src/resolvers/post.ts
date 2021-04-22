import { savePost } from "../utils/db/post";
import {
  getAllPosts,
  getPostByProfile,
  generateFeedForUser,
} from "../utils/db/post";
import { checkForSelectionField } from "../utils/getSelections";

const postSelections = ["author", "user"];

export const posts = async (_: any, _args: any, _context: any, info: any) => {
  return await getAllPosts(checkForSelectionField(info, postSelections));
};

export const addPost = async (_: any, args: { data: { data: any } }) => {
  // GET ID from Auth
  const userId = "";
  const data = args.data.data;
  // TODO validate the data
  return await savePost(userId, data);
};

export const postsByProfile = async (
  _: any,
  { id }: { id: string },
  _context: any,
  info: any
) => {
  return await getPostByProfile(
    id,
    checkForSelectionField(info, postSelections)
  );
};

export const feed = async () => {
  // GET ID from Auth
  const id = "";
  return await generateFeedForUser(id);
};
