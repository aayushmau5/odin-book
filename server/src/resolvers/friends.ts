import { listFriends, listFriendRequests } from "../utils/db/friends";

export const getFriends = async (_: any, { id }: { id: string }) => {
  return await listFriends(id);
};

export const getFriendRequests = async () => {
  //TODO get id from Auth
  const id = "";
  return await listFriendRequests(id);
};
