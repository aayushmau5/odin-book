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
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await requestFriend(currentProfileId, receiverProfileId);
};

export const cancelFriendRequest: RequestFunctionType = async (
  _: any,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await deleteFriendRequest(currentProfileId, receiverProfileId);
};

export const acceptFriendRequest: FriendFunctionType = async (
  _: any,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await acceptRequest(currentProfileId, receiverProfileId);
};

export const unfriendUser: FriendFunctionType = async (
  _: any,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await removeFriend(currentProfileId, receiverProfileId);
};
