import { listFriends, listFriendRequests } from "../utils/db/friends";
import { checkForSelectionField } from "../utils/getSelections";

const friendsSelection = ["user"];

export const getFriends = async (
  _: any,
  { profileId }: { profileId: string },
  _context: any,
  info: any
) => {
  return await listFriends(
    profileId,
    checkForSelectionField(info, friendsSelection)
  );
};

export const getFriendRequests = async (
  _parent: any,
  _args: any,
  _context: any,
  info: any
) => {
  //TODO get id from Auth
  const profileId = "";
  return await listFriendRequests(
    profileId,
    checkForSelectionField(info, friendsSelection)
  );
};
