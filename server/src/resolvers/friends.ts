import {
  sendFriendRequest as requestFriend,
  acceptRequest,
  deleteFriendRequest,
  unfriend as removeFriend,
} from "../utils/db/friends";
import { getProfileId } from "../utils/db/user";
import { checkForSelectionField } from "../utils/getSelections";

const friendsSelection = ["user"];

export const sendFriendRequest = async (
  _: any,
  { toUserId }: { toUserId: string },
  { userId }: { userId: string }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await requestFriend(senderProfileId, receiverProfileId);
};

export const cancelFriendRequest = async (
  _: any,
  { toUserId }: { toUserId: string },
  { userId }: { userId: string }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await deleteFriendRequest(senderProfileId, receiverProfileId);
};

export const acceptFriendRequest = async (
  _: any,
  { toUserId }: { toUserId: string },
  { userId }: { userId: string }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await acceptRequest(senderProfileId, receiverProfileId);
};

export const unfriend = async (
  _: any,
  { toUserId }: { toUserId: string },
  { userId }: { userId: string }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return (await removeFriend(senderProfileId, receiverProfileId))?.friends;
};
