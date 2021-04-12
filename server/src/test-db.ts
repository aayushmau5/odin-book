import {
  addUser,
  getAllUser,
  getAllUserExcept,
  getUser,
  setProfile,
  deleteProfile,
  updateCommonProfile,
  getUserByEmail,
} from "./utils/user";
import {
  getAllPosts,
  addPost,
  getPostByUser,
  likePost,
  dislikePost,
  removePost,
  generateFeed,
} from "./utils/post";
import {
  getCommentsOnPost,
  addCommentOnComment,
  addCommentToPost,
  removeComment,
} from "./utils/comment";

async function main() {
  const user = await addUser("username", "email222@gmail.com", "password");
  const profile = await setProfile(user.id, {
    display: "file.jpg",
    firstname: "First",
    lastname: "last",
  });
  console.log({ user, profile });
  const allUsers = await getAllUser();
  console.log({ allUsers });
  const specificUser = await getUser(user.id);
  console.log({ specificUser });
  const others = await getAllUserExcept(user.id);
  const updatedProfile = await updateCommonProfile(profile.id, {
    display: "file2.jgp",
  });
  console.log({ updatedProfile });
  console.log({ others });
}

main();
