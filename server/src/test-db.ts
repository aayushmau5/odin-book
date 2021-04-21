import {
  getAllUser,
  getAllProfiles,
  addUser,
  setProfile,
} from "./utils/db/user";

import {
  acceptRequest,
  listFriendRequests,
  listFriends,
  sendFriendRequest,
  unfriend,
} from "./utils/db/friends";

import {
  addPost,
  likePost,
  dislikePost,
  getAllPosts,
  getPostByUser,
  generateFeedForUser,
  removePost,
  removeAllPostByUser,
} from "./utils/db/post";
import {
  addCommentOnComment,
  addCommentToPost,
  getCommentsOnPost,
} from "./utils/db/comment";

async function createUser() {
  const first = await addUser("sherlock", "sherlock@gmail.com", "sherlock");
  const second = await addUser("john", "john@gmail.com", "john");
  const firstProfile = await setProfile(first.id, {
    display: "sherlock.jpg",
    firstname: "Sherlock",
    lastname: "Holmes",
  });
  const secondProfile = await setProfile(second.id, {
    display: "john.jpg",
    firstname: "John",
    lastname: "Watson",
  });
}

async function friendRequests() {
  // const users = await getAllProfiles();
  // await sendFriendRequest(sherlock.id, john.id);
  // await deleteFriendRequest(sherlock.id, john.id);
  // users.forEach(async (user) => {
  //   const data = await listFriendRequests(user.id);
  //   console.log({
  //     id: user.id,
  //     request_sent_to: data?.friendrequest_to,
  //     request_sent_by: data?.friendrequest_by,
  //   });
  // });
}

async function specificField() {
  // const users = await getAllUser();
  // const result = await getUserWithField(users[0].id, { profile: true });
  // console.log(result);
}

async function friends() {
  // const users = await getAllProfiles();
  // const john = users[0];
  // const sherlock = users[1];
  // await sendFriendRequest(john.id, sherlock.id);
  // console.log({
  //   john: await listFriendRequests(john.id),
  //   sherlock: await listFriendRequests(sherlock.id),
  // });
  // await acceptRequest(john.id, sherlock.id);
  // console.log({
  //   john: await listFriends(john.id),
  //   sherlock: await listFriends(sherlock.id),
  // });
  // await unfriend(sherlock.id, john.id);
  // console.log({
  //   john: await listFriends(john.id),
  //   sherlock: await listFriends(sherlock.id),
  // });
  // console.log({
  //   john: await listFriendRequests(john.id),
  //   sherlock: await listFriendRequests(sherlock.id),
  // });
}

// async function posts() {
//   const users = await getAllProfiles();
//   const john = users[0];
//   const sherlock = users[1];
//   const johnPost = await addPost(john.id, {
//     textData: "Hello there, sherlock",
//   });
//   const sherlockPost = await addPost(sherlock.id, { textData: "Welcome John" });
//   console.log({ johnPost, sherlockPost });
//   await likePost(johnPost.id);
//   await likePost(sherlockPost.id);
//   console.log(await getAllPosts());
//   const johnFeed = await generateFeedForUser(john.id);
//   const sherlockFeed = await generateFeedForUser(sherlock.id);
//   console.log({ johnFeed, sherlockFeed });
//   await dislikePost(johnPost.id);
//   await dislikePost(sherlockPost.id);
//   console.log(await getAllPosts());
// }

// async function comments() {
//   const users = await getAllProfiles();
//   const john = users[0];
//   const sherlock = users[1];
//   const johnPost = await addPost(john.id, {
//     textData: "Hello there, sherlock",
//   });
//   const sherlockPost = await addPost(sherlock.id, { textData: "Welcome John" });
//   const johnComment = await addCommentToPost(
//     john.id,
//     sherlockPost.id,
//     "Comment1"
//   );
//   const sherlockComment = await addCommentOnComment(
//     sherlockPost.id,
//     johnComment.id,
//     sherlock.id,
//     "Comment2"
//   );
//   console.log(await getCommentsOnPost(sherlockPost.id));
// }
