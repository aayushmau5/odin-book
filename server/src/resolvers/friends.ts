import {
  FriendFunctionType,
  RequestFunctionType,
} from "../types/UserProfileTypes";
import {
  sendFriendRequest as requestFriend,
  acceptRequest,
  deleteFriendRequest,
  unfriend as removeFriend,
} from "../utils/db/friends";
import { getProfileId } from "../utils/db/user";

export const sendFriendRequest: RequestFunctionType = async (
  _,
  { toUserId },
  { userId }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await requestFriend(senderProfileId, receiverProfileId);
};

export const cancelFriendRequest: RequestFunctionType = async (
  _: any,
  { toUserId },
  { userId }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await deleteFriendRequest(senderProfileId, receiverProfileId);
};

export const acceptFriendRequest: FriendFunctionType = async (
  _: any,
  { toUserId },
  { userId }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await acceptRequest(senderProfileId, receiverProfileId);
};

export const unfriend: FriendFunctionType = async (
  _: any,
  { toUserId },
  { userId }
) => {
  const senderProfileId = await getProfileId(userId);
  const receiverProfileId = await getProfileId(toUserId);
  return await removeFriend(senderProfileId, receiverProfileId);
};
