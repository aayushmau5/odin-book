import { Profile } from "@prisma/client";

export interface userSelectionsInterface {
  profile?: boolean;
  posts?: boolean;
  comments?: boolean;
  friends?: boolean;
  friends_posts?: boolean;
  friendrequests_to?: boolean;
}

export type RequestFunctionType = (
  _: any,
  { userId }: { userId: string },
  { currentProfileId }: { currentProfileId: string }
) => Promise<{
  id: string;
  friendrequest_by: Profile[];
  friendrequest_to: Profile[];
} | null>;

export type FriendFunctionType = (
  _: any,
  { userId }: { userId: string },
  { currentProfileId }: { currentProfileId: string }
) => Promise<{
  friends: Profile[];
} | null>;

export interface UserInput {
  email: string;
  password: string;
}

export interface OAuthUserInput {
  idToken: string;
}

export interface ProfileInput {
  firstname: string;
  lastname: string;
  display: string;
}
