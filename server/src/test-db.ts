import {
  getAllUser,
  getAllProfiles,
  getUserWithField,
  addUser,
  setProfile,
} from "./utils/user";

import {
  acceptRequest,
  listFriendRequests,
  listFriends,
  sendFriendRequest,
  unfriend,
} from "./utils/friends";

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
  const users = await getAllProfiles();
  // await sendFriendRequest(sherlock.id, john.id);
  // await deleteFriendRequest(sherlock.id, john.id);
  users.forEach(async (user) => {
    const data = await listFriendRequests(user.id);

    console.log({
      id: user.id,
      request_sent_to: data?.friendrequest_to,
      request_sent_by: data?.friendrequest_by,
    });
  });
}

async function specificField() {
  const users = await getAllUser();
  const result = await getUserWithField(users[0].id, { profile: true });
  console.log(result);
}

// main();
// specificField();

async function friends() {
  const users = await getAllProfiles();
  const john = users[0];
  const sherlock = users[1];
  await sendFriendRequest(john.id, sherlock.id);
  console.log({
    john: await listFriendRequests(john.id),
    sherlock: await listFriendRequests(sherlock.id),
  });
  await acceptRequest(john.id, sherlock.id);
  console.log({
    john: await listFriends(john.id),
    sherlock: await listFriends(sherlock.id),
  });
  await unfriend(sherlock.id, john.id);
  console.log({
    john: await listFriends(john.id),
    sherlock: await listFriends(sherlock.id),
  });
  console.log({
    john: await listFriendRequests(john.id),
    sherlock: await listFriendRequests(sherlock.id),
  });
}

friends();
