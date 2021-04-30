import * as FriendsDb from "../utils/db/friends";
import { getProfileId } from "../utils/db/user";
import {
  FriendFunctionType,
  RequestFunctionType,
} from "../types/UserProfileTypes";

export const sendFriendRequest: RequestFunctionType = async (
  _,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await FriendsDb.sendFriendRequest(currentProfileId, receiverProfileId);
};

export const cancelFriendRequest: RequestFunctionType = async (
  _,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await FriendsDb.deleteFriendRequest(
    currentProfileId,
    receiverProfileId
  );
};

export const acceptFriendRequest: FriendFunctionType = async (
  _,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await FriendsDb.acceptRequest(currentProfileId, receiverProfileId);
};

export const unfriendUser: FriendFunctionType = async (
  _,
  { userId },
  { currentProfileId }
) => {
  const receiverProfileId = await getProfileId(userId);
  return await FriendsDb.unfriend(currentProfileId, receiverProfileId);
};
