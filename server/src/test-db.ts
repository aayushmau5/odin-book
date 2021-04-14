import {
  addUser,
  getAllUser,
  getAllUserExcept,
  getUser,
  setProfile,
  deleteProfile,
  updateCommonProfile,
  getUserByEmail,
  listFriendRequests,
  sendFriendRequest,
  getUserWithProfile,
  getAllProfiles,
  deleteFriendRequest,
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
  try {
    // const first = await addUser("sherlock", "sherlock@gmail.com", "sherlock");
    // const second = await addUser("john", "john@gmail.com", "john");
    // const allusers = await getAllUser();
    // const firstProfile = await setProfile(allusers[0].id, {
    //   display: "sherlock.jpg",
    //   firstname: "Sherlock",
    //   lastname: "Holmes",
    // });
    // const secondProfile = await setProfile(allusers[1].id, {
    //   display: "john.jpg",
    //   firstname: "John",
    //   lastname: "Watson",
    // });
    const users = await getAllProfiles();
    // console.log(users);
    // console.log(users);
    const sherlock = users[0];
    const john = users[1];
    // users.forEach(async (user) => {
    //   const data = await listFriendRequests(user.id);
    //   console.log({ id: user.id, friends: JSON.stringify(data) });
    // });
    // await sendFriendRequest(sherlock.id, john.id);
    // users.forEach(async (user) => {
    //   const data = await listFriendRequests(user.id);
    //   console.log("After sending friend request");
    //   console.log({ id: user.id, friends: data });
    // });
    // await deleteFriendRequest(sherlock.id, john.id);
    users.forEach(async (user) => {
      const data = await listFriendRequests(user.id);
      // console.log("After deleting friend request");
      console.log({
        id: user.id,
        request_sent_to: data?.friendrequest_to,
        request_sent_by: data?.friendrequest_by,
      });
    });
  } catch (err) {
    console.log(err);
  }
}

main();
